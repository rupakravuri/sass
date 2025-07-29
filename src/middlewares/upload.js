import multer from 'multer';
import path from 'path';
import { uploadBuffer } from '../services/spaces.service.js';

// Configure multer to use memory storage
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Check if file is an image
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Middleware to upload single file to cloud storage
export const uploadSingle = (fieldName, folder = 'uploads') => {
  return [
    upload.single(fieldName),
    async (req, res, next) => {
      try {
        if (!req.file) {
          return next();
        }

        // Generate unique filename
        const timestamp = Date.now();
        const ext = path.extname(req.file.originalname);
        const filename = `${folder}/${timestamp}${ext}`;

        // Upload to cloud storage
        const url = await uploadBuffer(
          req.file.buffer,
          filename,
          req.file.mimetype
        );

        // Add file info to request
        req.file.url = url;
        req.file.key = filename;

        next();
      } catch (error) {
        next(error);
      }
    }
  ];
};

export default upload;