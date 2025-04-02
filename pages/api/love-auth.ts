import type { NextApiRequest, NextApiResponse } from 'next';

const PASSWORD = process.env.LOVE_AUTH_PASSWORD;
const VALID_TOKEN = process.env.LOVE_AUTH_TOKEN;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { password, token } = req.body;

  // Authentication
  if (password) {
    if (password === PASSWORD) {
      return res.status(200).json({ token: VALID_TOKEN });
    } else {
      return res.status(401).json({ message: 'Invalid password' });
    }
  }

  // Verification
  if (token) {
    if (token === VALID_TOKEN) {
      return res.status(200).json({ message: 'Token is valid' });
    } else {
      return res.status(401).json({ message: 'Invalid token' });
    }
  }

  return res.status(400).json({ message: 'Missing password or token' });
}
