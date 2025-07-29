import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import config from './config/index.js';
import routes from './routes/v1/index.js';
import { errorConverter, errorHandler } from './middlewares/error.js';
import ApiError from './utils/ApiError.js';
import sanitize from './middlewares/sanitize.js'; // <- new

const app = express();

// Security & parsers
app.use(helmet());
app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] }));
app.use(hpp());

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Optional input sanitizer (remove if you don't need it globally)
// app.use(sanitize());

// Rate limit (per API prefix)
app.use('/v1', rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  standardHeaders: true,
  legacyHeaders: false
}));

// Routes
app.use('/v1', routes);
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

// 404
app.use((req, _res, next) => next(new ApiError(404, 'Not found')));

// Error handlers
app.use(errorConverter);
app.use(errorHandler);

export default app;
