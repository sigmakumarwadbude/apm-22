import app from './app';
import { env } from './config/env';

const server = app.listen(env.port, () => {
  console.log(`🚀 Server running on http://localhost:${env.port}`);
});

function shutdown(signal: string) {
  console.log(`${signal} received. Shutting down...`);

  server.close(() => {
    console.log('HTTP server closed.');
    process.exit(0);
  });
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));