import { IncomingForm, File } from 'formidable';
import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: false,
  },
};

const baseDir = path.join('/tmp', 'letters');

function sanitizeFilename(filename: string): string {
  const ext = path.extname(filename || '');
  const name = path.basename(filename || 'image', ext);
  return `${name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_${Date.now()}${ext}`;
}

function ensureArray<T>(item: T | T[] | undefined | null): T[] {
  if (!item) return [];
  return Array.isArray(item) ? item : [item];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const form = new IncomingForm({ keepExtensions: true, multiples: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Form parse error:', err);
      return res.status(500).json({ error: 'Form parse error' });
    }

    const title = ensureArray(fields.title)[0];
    const content = ensureArray(fields.content)[0];
    const author = ensureArray(fields.author)[0];

    if (!title || !content || !author) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const timestamp = new Date().toISOString();
    const dirPath = path.join(baseDir, timestamp);
    const imagesDir = path.join(dirPath, 'images');

    await fs.promises.mkdir(imagesDir, { recursive: true });

    const fileArray = ensureArray(files.images) as File[];
    const uploadedImages: string[] = [];

    for (const file of fileArray) {
      if (!file || typeof file.filepath !== 'string') continue;

      const safeName = sanitizeFilename(file.originalFilename || 'image');
      const destPath = path.join(imagesDir, safeName);

      await fs.promises.copyFile(file.filepath, destPath);
      uploadedImages.push(`/api/letters/getImageByStamp?datestamp=${timestamp}&file=${encodeURIComponent(safeName)}`);
    }

    const letter = {
      title,
      content,
      author,
      images: uploadedImages,
    };

    const letterPath = path.join(dirPath, 'letter.json');
    await fs.promises.writeFile(letterPath, JSON.stringify(letter, null, 2));

    return res.status(201).json({ message: 'Letter created', datestamp: timestamp });
  });
}
