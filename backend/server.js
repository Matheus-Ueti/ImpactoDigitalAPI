import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import ordersRouter from './routes/orders.js';
import webhooksRouter from './routes/webhooks.js';

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST'],
}));

app.use(express.json());

app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/orders', ordersRouter);
app.use('/api/webhooks', webhooksRouter);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Erro interno do servidor.' });
});

// Exporta para Vercel (serverless) e também inicia localmente
if (process.env.NODE_ENV !== 'production' || process.env.LOCAL) {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => console.log(`Backend rodando em http://localhost:${PORT}`));
}

export default app;
