import { promises as fs } from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

const baseDir = path.join(process.cwd(), 'letters');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { datestamp } = req.query;

  if (!datestamp || typeof datestamp !== 'string') {
    return res.status(400).json({ error: 'Missing datestamp' });
  }

  try {
    const dirPath = path.join(baseDir, datestamp);
    const letterPath = path.join(dirPath, 'letter.json');

    const letterContent = await fs.readFile(letterPath, 'utf-8');
    const letter = JSON.parse(letterContent);

    // Ensure images are still there — regenerate URLs
    const imagesDir = path.join(dirPath, 'images');
    let imageFiles: string[] = [];

    try {
      imageFiles = await fs.readdir(imagesDir);
    } catch {
      imageFiles = [];
    }

    const images = imageFiles.map((img) =>
      `/api/letters/getImageByStamp?datestamp=${datestamp}&file=${encodeURIComponent(img)}`
    );

    return res.status(200).json({ ...letter, datestamp, images });
  } catch {
    return res.status(404).json({ error: 'Letter not found' });
  }
}
