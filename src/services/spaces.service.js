import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import config from '../config/index.js';

const s3 = new S3Client({
  region: config.spaces.region, // DO ignores but SDK needs a value
  endpoint: config.spaces.endpoint,
  forcePathStyle: false,
  credentials: { accessKeyId: config.spaces.key, secretAccessKey: config.spaces.secret }
});

export async function uploadBuffer(buffer, key, contentType = 'application/octet-stream', acl = 'public-read') {
  await s3.send(new PutObjectCommand({ Bucket: config.spaces.bucket, Key: key, Body: buffer, ContentType: contentType, ACL: acl }));
  return buildPublicUrl(key);
}

export async function deleteObject(key) {
  await s3.send(new DeleteObjectCommand({ Bucket: config.spaces.bucket, Key: key }));
}

export function buildPublicUrl(key) {
  return config.spaces.cdn ? `${config.spaces.cdn}/${key}` : `${config.spaces.endpoint.replace('https://', 'https://'+config.spaces.bucket+'.')}/${key}`;
}

export async function getSignedGetUrl(key, expiresIn = 3600) {
  const command = new GetObjectCommand({ Bucket: config.spaces.bucket, Key: key });
  return getSignedUrl(s3, command, { expiresIn });
}