import { promises as fs } from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

const baseDir = path.join(process.cwd(), 'letters');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Only GET allowed' });

  try {
    const dirs = await fs.readdir(baseDir);
    const letters = await Promise.all(
      dirs.map(async (dirName) => {
        const filePath = path.join(baseDir, dirName, 'letter.json');
        try {
          const content = await fs.readFile(filePath, 'utf-8');
          const { title, author } = JSON.parse(content);
          return { datestamp: dirName, title, author };
        } catch {
          return null;
        }
      })
    );

    const filtered = letters.filter(Boolean);
    return res.status(200).json({ letters: filtered });
  } catch {
    return res.status(500).json({ error: 'Failed to fetch letters' });
  }
}
