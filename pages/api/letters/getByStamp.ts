// /pages/api/letters/getByStamp.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/utils/mongoose';
import LetterModel, { LetterDocument } from '@/models/Letter';

type Response = {
  title: string;
  content: string;
  author: string;
  images: string[];
  datestamp: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response | { error: string }>
): Promise<void> {
  const { datestamp } = req.query;

  if (!datestamp || typeof datestamp !== 'string') {
    return res.status(400).json({ error: 'Missing datestamp' });
  }

  try {
    await connectToDatabase();

    const date = new Date(datestamp);
    if (isNaN(date.getTime())) {
      return res.status(400).json({ error: 'Invalid datestamp' });
    }

    const letter = await LetterModel.findOne({ createdAt: date }).lean<LetterDocument>();

    if (!letter) {
      return res.status(404).json({ error: 'Letter not found' });
    }

    // Transform stored blob paths into secure API image routes
    const images = (letter.images || []).map((blobPath) => {
      const file = blobPath.split('/').pop(); // e.g. "0_flower.jpg"
      return `/api/letters/image?stamp=${encodeURIComponent(datestamp)}&file=${encodeURIComponent(file ?? '')}`;
    });

    return res.status(200).json({
      title: letter.title,
      content: letter.content,
      author: letter.author,
      images,
      datestamp: letter.createdAt.toISOString(),
    });
  } catch (err) {
    console.error('Error fetching letter by datestamp:', err);
    return res.status(500).json({ error: 'Failed to retrieve letter' });
  }
}
