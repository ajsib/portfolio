// models/Letter.ts
import { Schema, Document, models, model } from 'mongoose';

export interface LetterDocument extends Document {
  title: string;
  content: string;
  author: string;
  images: string[];
  createdAt: Date;
}

const LetterSchema = new Schema<LetterDocument>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  images: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
});

// Avoid recompiling model during hot reloads (important for Next.js dev)
const LetterModel = models.Letter || model<LetterDocument>('Letter', LetterSchema);

export default LetterModel;
