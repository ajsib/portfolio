import type { NextApiRequest, NextApiResponse } from 'next';
import { PassThrough } from 'stream';
import Busboy from 'busboy';
import path from 'path';
import blobServiceClient from '@/utils/blobServiceClient';

export const config = {
  api: {
    bodyParser: false,
  },
};

function sanitizeFilename(filepath: string): string {
  // Keep the directory structure but sanitize individual parts
  const parts = filepath.split('/');
  const sanitizedParts = parts.map(part => {
    const ext = path.extname(part || '');
    const name = path.basename(part || 'file', ext);
    return `${name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}${ext}`;
  });
  return sanitizedParts.join('/');
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const fileUploads: Promise<void>[] = [];
  const containerName = 'videoproject';
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const busboy = Busboy({ headers: req.headers });

  busboy.on('file', (fieldname, file, info) => {
    const { filename, mimeType } = info;
    if (!filename) return;

    // Use webkitRelativePath to maintain directory structure
    let filePath = filename;
    if (filename.includes('\\')) {
      // Convert Windows paths to forward slashes
      filePath = filename.replace(/\\/g, '/');
    }

    const sanitized = sanitizeFilename(filePath);
    const blobClient = containerClient.getBlockBlobClient(sanitized);

    const passthrough = new PassThrough();
    file.pipe(passthrough);

    const uploadPromise = blobClient
      .uploadStream(passthrough, 4 * 1024 * 1024, 20, {
        blobHTTPHeaders: { blobContentType: mimeType },
      })
      .then(() => console.log(`✅ Uploaded: ${sanitized}`))
      .catch((err) => console.error(`❌ Failed: ${sanitized}`, err));

    fileUploads.push(uploadPromise);
  });

  await new Promise<void>((resolve, reject) => {
    req.pipe(busboy);
    busboy.on('finish', resolve);
    busboy.on('error', reject);
  });

  await Promise.all(fileUploads);
  res.status(200).json({ message: 'Upload complete' });
}