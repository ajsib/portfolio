import type { NextApiRequest, NextApiResponse } from 'next';
import blobServiceClient from '@/utils/blobServiceClient';

type FileBlob = {
  name: string;
  url: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<FileBlob[] | { error: string }>) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Only GET allowed' });
  }

  const containerName = 'videoproject';
  const containerClient = blobServiceClient.getContainerClient(containerName);

  try {
    const blobs: FileBlob[] = [];

    for await (const blob of containerClient.listBlobsFlat()) {
      // The blob name already includes the full path with directories
      const blobClient = containerClient.getBlobClient(blob.name);
      blobs.push({
        name: blob.name, // This already has the full path including directories
        url: blobClient.url,
      });
    }

    res.status(200).json(blobs);
  } catch (err) {
    console.error('❌ Failed to list blobs:', err);
    res.status(500).json({ error: 'Failed to list files' });
  }
}