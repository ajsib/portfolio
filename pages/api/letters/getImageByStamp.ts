import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const baseDir = path.join('/tmp', 'letters');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { datestamp, file } = req.query;

  if (!datestamp || !file || Array.isArray(file)) {
    return res.status(400).send('Invalid parameters');
  }

  const filePath = path.join(baseDir, datestamp as string, 'images', decodeURIComponent(file));

  try {
    const stream = fs.createReadStream(filePath);
    const ext = path.extname(file).substring(1);
    res.setHeader('Content-Type', `image/${ext}`);
    stream.pipe(res);
  } catch {
    res.status(404).send('Image not found');
  }
}
