// /pages/api/letters/create.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { PassThrough } from 'stream';
import Busboy from 'busboy';
import path from 'path';
import { connectToDatabase } from '@/utils/mongoose';
import LetterModel from '@/models/Letter';
import blobServiceClient from '@/utils/blobServiceClient';

export const config = {
  api: {
    bodyParser: false,
  },
};

type SuccessResponse = {
  message: string;
  datestamp: string;
};

type ErrorResponse = {
  error: string;
};

const validFields = ['title', 'content', 'author'] as const;
type ValidField = typeof validFields[number];

function isValidField(field: string): field is ValidField {
  return validFields.includes(field as ValidField);
}

function sanitizeFilename(filename: string): string {
  const ext = path.extname(filename || '');
  const name = path.basename(filename || 'image', ext);
  return `${name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}${ext}`;
}

interface ParsedFields {
  title?: string;
  content?: string;
  author?: string;
  images: string[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>
): Promise<void> {
  console.log(`[POST] /api/letters/create`);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const fields: ParsedFields = { images: [] };
  const fileUploads: Promise<void>[] = [];
  const datestamp = new Date().toISOString();

  try {
    const busboy = Busboy({ headers: req.headers });
    const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME!;
    const containerClient = blobServiceClient.getContainerClient(containerName);

    let fileIndex = 0;

    busboy.on('file', (fieldname, file, info) => {
      const { filename, mimeType } = info;
      if (!filename || !mimeType) return;

      const safeName = sanitizeFilename(filename);
      const blobPath = `letters/${datestamp}/${fileIndex++}_${safeName}`;
      const blobClient = containerClient.getBlockBlobClient(blobPath);

      const passthrough = new PassThrough();
      file.pipe(passthrough);

      const uploadPromise = blobClient
        .uploadStream(passthrough, 4 * 1024 * 1024, 20, {
          blobHTTPHeaders: { blobContentType: mimeType },
        })
        .then(() => {
            fields.images.push(blobPath); 
            console.log(`✅ Uploaded to Azure: ${blobPath}`);
          })
        .catch((err) => {
          console.error('❌ Azure upload failed:', err);
        });

      fileUploads.push(uploadPromise);
    });

    busboy.on('field', (fieldname, value) => {
      if (isValidField(fieldname)) {
        fields[fieldname] = value;
        console.log(`📄 Field received: ${fieldname} = ${value}`);
      } else {
        console.warn(`⚠️ Unknown field: ${fieldname}`);
      }
    });

    const finished = new Promise<void>((resolve, reject) => {
      busboy.on('finish', resolve);
      busboy.on('error', reject);
    });

    req.pipe(busboy);
    await finished;
    await Promise.all(fileUploads);

    const { title, content, author, images } = fields;

    if (!title || !content || !author) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    await connectToDatabase();

    await LetterModel.create({
      title,
      content,
      author,
      images,
      createdAt: new Date(datestamp),
    });

    return res.status(201).json({
      message: 'Letter created',
      datestamp,
    });
  } catch (err) {
    console.error('💥 Unexpected error in letter creation:', err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
}
