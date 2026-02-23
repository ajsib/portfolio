// /pages/api/letters/image.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import blobServiceClient from '@/utils/blobServiceClient';

export const config = {
  api: {
    responseLimit: false, // Allow large image streaming
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { stamp, file } = req.query;

  if (!stamp || !file || Array.isArray(file) || Array.isArray(stamp)) {
    return res.status(400).json({ error: 'Invalid parameters' });
  }

  try {
    const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME!;
    const containerClient = blobServiceClient.getContainerClient(containerName);

    const blobPath = `letters/${stamp}/${file}`;
    const blobClient = containerClient.getBlobClient(blobPath);

    if (!(await blobClient.exists())) {
      return res.status(404).json({ error: 'File not found' });
    }

    const downloadResponse = await blobClient.download();

    res.setHeader('Content-Type', downloadResponse.contentType || 'application/octet-stream');
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    downloadResponse.readableStreamBody?.pipe(res);
  } catch (err) {
    console.error('Error streaming image:', err);
    res.status(500).json({ error: 'Failed to stream image' });
  }
}
