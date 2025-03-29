// /pages/api/letters/create.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import Busboy from 'busboy';

// Define response types
type SuccessResponse = {
  message: string;
  datestamp: string;
};

type ErrorResponse = {
  error: string;
};

// Define our letter type
interface Letter {
  title: string;
  content: string;
  author: string;
  images: string[];
}

// Define parsed fields from form
interface ParsedFields {
  title?: string;
  content?: string;
  author?: string;
  images: string[];
}

// Export configuration to disable built-in body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

// Define base directory for storing letters
const baseDir = path.join('/tmp', 'letters');

/**
 * Sanitizes a filename to make it safe for storage
 * @param filename The original filename
 * @returns A sanitized version of the filename
 */
function sanitizeFilename(filename: string): string {
  console.log(`Sanitizing filename: ${filename}`);
  const ext = path.extname(filename || '');
  const name = path.basename(filename || 'image', ext);
  const sanitized = `${name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_${Date.now()}${ext}`;
  console.log(`Sanitized filename: ${sanitized}`);
  return sanitized;
}

/**
 * API handler for creating letters with file uploads
 */
export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse<SuccessResponse | ErrorResponse>
): Promise<void> {
  console.log(`Request received: ${req.method} ${req.url}`);
  
  // Verify method is POST
  if (req.method !== 'POST') {
    console.log(`Method not allowed: ${req.method}`);
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  // Create timestamp and directory structure
  const timestamp: string = new Date().toISOString();
  console.log(`Created timestamp: ${timestamp}`);
  
  const dirPath: string = path.join(baseDir, timestamp);
  const imagesDir: string = path.join(dirPath, 'images');
  
  console.log(`Creating directory: ${imagesDir}`);
  try {
    await fs.promises.mkdir(imagesDir, { recursive: true });
    console.log(`Directory created successfully: ${imagesDir}`);
  } catch (error) {
    console.error(`Failed to create directory: ${imagesDir}`, error);
    return res.status(500).json({ error: 'Failed to create storage directory' });
  }

  const fields: ParsedFields = { images: [] };
  const fileWrites: Promise<void>[] = [];
  
  // Create busboy instance with proper typing
  const busboy = Busboy({ headers: req.headers });
  
  // Handle file uploads
  busboy.on('file', (fieldname: string, file: NodeJS.ReadableStream, info: { filename: string; encoding: string; mimeType: string }) => {
    const { filename, mimeType } = info;
    console.log(`File upload detected. Field: ${fieldname}, Filename: ${filename}, MimeType: ${mimeType}`);
    
    if (!filename) {
      console.log('Empty filename detected, skipping file');
      return;
    }
    
    const safeName: string = sanitizeFilename(filename);
    const saveTo: string = path.join(imagesDir, safeName);
    console.log(`Saving file to: ${saveTo}`);
    
    const writeStream = fs.createWriteStream(saveTo);
    file.pipe(writeStream);
    
    const writePromise = new Promise<void>((resolve, reject) => {
      writeStream.on('finish', () => {
        console.log(`File written successfully: ${saveTo}`);
        const imagePath = `/api/letters/getImageByStamp?datestamp=${timestamp}&file=${encodeURIComponent(safeName)}`;
        fields.images.push(imagePath);
        console.log(`Added image path to letter: ${imagePath}`);
        resolve();
      });
      
      writeStream.on('error', (err) => {
        console.error(`Error writing file: ${saveTo}`, err);
        reject(err);
      });
    });
    
    fileWrites.push(writePromise);
  });
  
  // Handle form fields
  const validFields = ['title', 'content', 'author'] as const;
  type ValidField = typeof validFields[number];
  
  function isValidField(field: string): field is ValidField {
    return validFields.includes(field as ValidField);
  }
  
  busboy.on('field', (fieldname: string, val: string) => {
    console.log(`Form field received: ${fieldname}=${val}`);
  
    if (isValidField(fieldname)) {
      fields[fieldname] = val;
    } else {
      console.log(`Ignoring unknown field: ${fieldname}`);
    }
  });
  
  // Handle errors
  busboy.on('error', (err: Error) => {
    console.error('Busboy error:', err);
    res.status(500).json({ error: 'File upload failed' });
  });
  
  // Handle completion
  busboy.on('finish', async () => {
    console.log('Busboy processing finished');
    
    // Extract and validate required fields
    const { title, content, author, images } = fields;
    
    if (!title || !content || !author) {
      console.error('Missing required fields', { title: !!title, content: !!content, author: !!author });
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    try {
      // Wait for all file writes to complete
      console.log(`Waiting for ${fileWrites.length} file writes to complete`);
      await Promise.all(fileWrites);
      console.log('All file writes completed successfully');
      
      // Create the letter object with proper typing
      const letter: Letter = { 
        title, 
        content, 
        author, 
        images 
      };
      
      // Save letter data
      const letterPath: string = path.join(dirPath, 'letter.json');
      console.log(`Saving letter data to: ${letterPath}`);
      await fs.promises.writeFile(letterPath, JSON.stringify(letter, null, 2));
      console.log('Letter data saved successfully');
      
      // Return success response
      const response: SuccessResponse = { 
        message: 'Letter created', 
        datestamp: timestamp 
      };
      
      console.log('API request completed successfully', response);
      res.status(201).json(response);
    } catch (error) {
      console.error('Error processing letter:', error);
      res.status(500).json({ error: 'Failed to process letter' });
    }
  });
  
  // Pipe request to busboy
  console.log('Starting busboy processing');
  req.pipe(busboy);
}