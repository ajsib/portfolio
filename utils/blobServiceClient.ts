// utils/blobServiceClient.ts

import { BlobServiceClient, StorageSharedKeyCredential } from '@azure/storage-blob';

const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;

if (!accountName || !accountKey) {
  throw new Error('❌ Missing Azure Storage environment variables. Make sure AZURE_STORAGE_ACCOUNT_NAME and AZURE_STORAGE_ACCOUNT_KEY are set.');
}

const credentials = new StorageSharedKeyCredential(accountName, accountKey);

const blobServiceClient: BlobServiceClient = new BlobServiceClient(
  `https://${accountName}.blob.core.windows.net`,
  credentials
);

console.log('✅ Azure BlobServiceClient initialized');

export default blobServiceClient;
