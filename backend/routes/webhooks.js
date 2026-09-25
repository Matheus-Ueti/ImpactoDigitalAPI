import { Router } from 'express';
import supabase from '../db.js';

const router = Router();

function validateWebhookAuth(req) {
  const secret = process.env.SYNCPAY_WEBHOOK_SECRET;
  if (!secret) return true;
  return req.headers.authorization === `Bearer ${secret}`;
}

// POST /api/webhooks/syncpay
router.post('/syncpay', async (req, res) => {
  if (!validateWebhookAuth(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const payload = req.body;
  const event = payload.event ?? payload.type;

  await supabase.from('webhook_logs').insert({ event, payload: JSON.stringify(payload) });

  const transactionId = payload.data?.transaction_id ?? payload.transaction_id ?? payload.id;
  if (!transactionId) return res.sendStatus(200);

  const { data: order } = await supabase
    .from('orders')
    .select('id')
    .eq('syncpay_transaction_id', transactionId)
    .single();

  if (!order) return res.sendStatus(200);

  const statusMap = {
    'credit_card.updated': mapCardStatus,
    'credit_card.created': () => 'pending',
    'pix.paid': () => 'completed',
    'pix.expired': () => 'failed',
    'pix.created': () => 'pending',
  };

  const mapper = statusMap[event];
  if (!mapper) return res.sendStatus(200);

  await supabase.from('orders').update({ payment_status: mapper(payload) }).eq('id', order.id);

  return res.sendStatus(200);
});

function mapCardStatus(payload) {
  const status = payload.data?.status ?? payload.status;
  return { completed: 'completed', approved: 'completed', failed: 'failed', declined: 'failed', refunded: 'refunded' }[status] ?? 'pending';
}

export default router;
