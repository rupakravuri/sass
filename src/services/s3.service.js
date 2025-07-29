import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import config from '../config/index.js';
import fs from 'fs';

const s3 = new S3Client({ region: config.aws.region, credentials: { accessKeyId: config.aws.key, secretAccessKey: config.aws.secret } });

export async function uploadFile(localPath, key, bucket = config.aws.bucket, acl = 'public-read') {
  const Body = fs.createReadStream(localPath);
  await s3.send(new PutObjectCommand({ Bucket: bucket, Key: key, Body, ACL: acl }));
  return `https://${bucket}.s3.amazonaws.com/${key}`;
}
