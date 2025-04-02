import blobServiceClient from '@/utils/blobServiceClient';
import JSZip from 'jszip';

export const config = {
  api: {
    responseLimit: false, // Allow large ZIPs
  },
};

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Only GET allowed' });
  }

  const containerName = 'videoproject';
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const zip = new JSZip();

  try {
    // Check if container exists
    const exists = await containerClient.exists();
    if (!exists) {
      return res.status(404).json({ error: 'Container does not exist' });
    }

    // List and add blobs to ZIP
    const blobs = containerClient.listBlobsFlat();

    for await (const blob of blobs) {
      const blobClient = containerClient.getBlobClient(blob.name);
      const downloadResponse = await blobClient.download();

      const stream = downloadResponse.readableStreamBody;
      if (!stream) continue;

      const chunks = [];

      for await (const chunk of stream) {
        chunks.push(chunk instanceof Uint8Array ? chunk : Buffer.from(chunk));
      }

      const buffer = Buffer.concat(chunks);

      // Fully safe Uint8Array with guaranteed ArrayBuffer backing
      const uint8Array = new Uint8Array(buffer.length);
      uint8Array.set(buffer);

      zip.file(blob.name, uint8Array);
    }

    // Generate ZIP as buffer
    const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });

    // Send ZIP
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename="videoproject.zip"');
    res.setHeader('Content-Length', zipBuffer.length);
    res.status(200).end(zipBuffer); // End with buffer
  } catch (err) {
    console.error('❌ Failed to create zip archive:', err);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Failed to download files' });
    }
  }
}
