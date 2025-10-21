import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from './server/api/root';
import { createTRPCContext } from './server/api/trpc';

const app = express();
const PORT = process.env.PORT || 4000;

// Enable CORS for all origins
app.use(cors({
  origin: '*', // Allow all origins
  credentials: false, // Set to false when using origin: '*'
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

// tRPC endpoint
app.use(
  '/trpc',
  createExpressMiddleware({
    router: appRouter,
    createContext: createTRPCContext,
  })
);

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📡 tRPC endpoint: http://localhost:${PORT}/trpc`);
  console.log(`❤️  Health check: http://localhost:${PORT}/health`);
});
