// This is server-side code (Vercel Function)
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import type { NextRequest } from 'next/server';

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
  activityName: string;
  files: FileMetadata[];
  folderName: string;
};

type ResponsePayload = {
  uploadUrls?: { url: string; key: string; filename: string }[];
  error?: string;
};
// ---

// 2. This is your API handler.
export async function POST(request: NextRequest) {
  try {
    // 3. Get typed data from the request body
    const body: RequestBody = await request.json();
    const { submissionId, activityName, files, folderName } = body;

    if (!submissionId || !activityName || !files || !Array.isArray(files) || !folderName) {
      return Response.json({ error: 'Missing submissionId, activityName, files, or folderName' }, { status: 400 });
    }

    const uploadUrls = [];

    // 4. Generate one pre-signed URL for each file.
    for (const file of files) {
      const cleanActivityName = activityName.trim().replace(/\s+/g, '_');
      const bucketPrefix = `${folderName}/`;
      const key = `${bucketPrefix}${submissionId}_${cleanActivityName}/${file.name}`;

      const command = new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME as string,
        Key: key,
        ContentType: file.type,
      });

      const url = await getSignedUrl(s3Client, command, { expiresIn: 600 });

      uploadUrls.push({ url, key, filename: file.name });
    }

    // 5. Send the URLs back to the client.
    return Response.json({ uploadUrls });

  } catch (error) {
    console.error('Error generating signed URLs:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}