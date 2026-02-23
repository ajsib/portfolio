import type { NextApiRequest, NextApiResponse } from 'next';
import blobServiceClient from '@/utils/blobServiceClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Only GET allowed' });
  }

  const filePath = req.query.filePath as string;
  if (!filePath) {
    return res.status(400).json({ error: 'File path is required' });
  }

  const containerName = 'videoproject';
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blobClient = containerClient.getBlobClient(filePath);

  try {
    // Check if the blob exists
    const exists = await blobClient.exists();
    if (!exists) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Get blob properties to set correct content type
    const properties = await blobClient.getProperties();
    
    // Set the appropriate headers
    res.setHeader('Content-Type', properties.contentType || 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(filePath.split('/').pop() || 'download')}"`);
    
    // Download the blob
    const downloadResponse = await blobClient.download();
    
    // Stream the blob content to the response
    downloadResponse.readableStreamBody?.pipe(res);
  } catch (err) {
    console.error('❌ Failed to download blob:', err);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Failed to download file' });
    }
  }
}