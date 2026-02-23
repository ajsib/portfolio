// /pages/api/letters/getAll.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/utils/mongoose';
import LetterModel from '@/models/Letter';

type LetterSummary = {
  datestamp: string;
  title: string;
  author: string;
};

type Response = {
  letters: LetterSummary[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response | { error: string }>
): Promise<void> {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Only GET allowed' });
  }

  try {
    await connectToDatabase();

    const letters = await LetterModel.find({}, 'title author createdAt')
      .sort({ createdAt: -1 })
      .lean();

    const formatted: LetterSummary[] = letters.map((letter) => ({
      datestamp: letter.createdAt.toISOString(),
      title: letter.title,
      author: letter.author,
    }));

    return res.status(200).json({ letters: formatted });
  } catch (err) {
    console.error('Failed to fetch letters:', err);
    return res.status(500).json({ error: 'Failed to fetch letters' });
  }
}
