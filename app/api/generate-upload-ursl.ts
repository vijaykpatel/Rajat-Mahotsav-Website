// This is server-side code (Vercel Function)
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import type { NextApiRequest, NextApiResponse } from 'next';

// 1. Initialize the S3 Client for R2 (unchanged).
const s3Client = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT as string,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY as string,
  },
});

// --- DEFINE TYPES ---
type FileMetadata = {
  name: string;
  type: string;
};

type RequestBody = {
  submissionId: string;
  eventName: string;
  files: FileMetadata[];
  directoryName: string;
};

type ResponsePayload = {
  uploadUrls?: { url: string; key: string; filename: string }[];
  error?: string;
};
// ---

// 2. This is your API handler.
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponsePayload>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // 3. Get typed data from the request body
    const { submissionId, eventName: eventName, files, directoryName: directoryName } = req.body as RequestBody;

    if (!submissionId || !eventName || !files || !Array.isArray(files) || !directoryName) {
      return res.status(400).json({ error: 'Missing submissionId, eventName, files, or directoryName' });
    }

    const uploadUrls = [];

    // 4. Generate one pre-signed URL for each file.
    for (const file of files) {

      const cleanEventName = eventName.trim().replace(/\s+/g, '_');
      const bucketPrefix = `${process.env.R2_BUCKET_PREFIX as string}${directoryName}/`;
      const key = `${bucketPrefix}${submissionId}_${cleanEventName}/${file.name}`;

      const command = new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME as string,
        Key: key, 
        ContentType: file.type,
      });

      const url = await getSignedUrl(s3Client, command, { expiresIn: 600 });

      uploadUrls.push({ url, key, filename: file.name });
    }

    // 5. Send the URLs back to the client.
    res.status(200).json({ uploadUrls });

  } catch (error) {
    console.error('Error generating signed URLs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}