import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 8080,
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  },
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    db: process.env.REDIS_DB || 0
  },
  mail: {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
    from: process.env.MAIL_FROM
  },
  spaces: {
    region: process.env.SPACES_REGION,
    endpoint: process.env.SPACES_ENDPOINT,
    key: process.env.SPACES_KEY,
    secret: process.env.SPACES_SECRET,
    bucket: process.env.SPACES_BUCKET,
    cdn: process.env.SPACES_CDN || null
  }
};

export default config;