import { Router } from 'express';
import { randomUUID } from 'crypto';
import supabase from '../db.js';
import { createPixCharge, tokenizeCard, createCardCharge } from '../syncpay.js';

const router = Router();

const PACKAGES = {
  followers: [
    { id: 1, amount: 1000, price_cents: 1990 },
    { id: 2, amount: 5000, price_cents: 6990 },
    { id: 3, amount: 10000, price_cents: 11990 },
  ],
  likes: [
    { id: 4, amount: 500, price_cents: 990 },
    { id: 5, amount: 9000, price_cents: 2990 },
    { id: 6, amount: 5000, price_cents: 5990 },
  ],
  views: [
    { id: 7, amount: 1000, price_cents: 790 },
    { id: 8, amount: 10000, price_cents: 3990 },
    { id: 9, amount: 50000, price_cents: 8990 },
  ],
};

function validateOrderBody(body) {
  const { platform, category, package_id, target, payment_method, customer } = body;
  if (!platform || !['instagram', 'tiktok', 'kwai'].includes(platform)) return 'Plataforma inválida.';
  if (!category || !PACKAGES[category]) return 'Categoria inválida.';
  if (!PACKAGES[category].find((p) => p.id === Number(package_id))) return 'Pacote não encontrado.';
  if (!target || target.trim().length < 2) return 'Usuário/link obrigatório.';
  if (!payment_method || !['pix', 'credit_card'].includes(payment_method)) return 'Método de pagamento inválido.';
  if (!customer?.name || !customer?.email || !customer?.cpf) return 'Dados do cliente obrigatórios (name, email, cpf).';
  return null;
}

// POST /api/orders
router.post('/', async (req, res) => {
  const error = validateOrderBody(req.body);
  if (error) return res.status(400).json({ error });

  const { platform, category, package_id, target, payment_method, customer, card } = req.body;
  const pkg = PACKAGES[category].find((p) => p.id === Number(package_id));
  const externalId = randomUUID();
  const description = `${pkg.amount} ${category} - ${platform}`;

  const { data: order, error: insertError } = await supabase
    .from('orders')
    .insert({
      external_id: externalId,
      platform,
      category,
      package_id: pkg.id,
      amount: pkg.amount,
      price_cents: pkg.price_cents,
      target: target.trim(),
      payment_method,
      payment_status: 'pending',
      customer_name: customer.name,
      customer_email: customer.email,
      customer_cpf: customer.cpf.replace(/\D/g, ''),
    })
    .select()
    .single();

  if (insertError) {
    console.error('Supabase insert error:', insertError);
    return res.status(500).json({ error: 'Erro ao criar pedido.' });
  }

  try {
    if (payment_method === 'pix') {
      const pixData = await createPixCharge({
        externalId,
        amountCents: pkg.price_cents,
        customer,
        description,
      });

      await supabase
        .from('orders')
        .update({
          syncpay_transaction_id: pixData.transaction_id ?? pixData.id,
          syncpay_pix_code: pixData.pix_code ?? pixData.qr_code,
          syncpay_pix_expiration: pixData.expiration,
        })
        .eq('id', order.id);

      return res.status(201).json({
        order_id: order.id,
        external_id: externalId,
        payment_method: 'pix',
        pix_code: pixData.pix_code ?? pixData.qr_code,
        pix_expiration: pixData.expiration,
        amount: pkg.price_cents,
      });
    }

    if (payment_method === 'credit_card') {
      if (!card?.number || !card?.holder_name || !card?.expiry_month || !card?.expiry_year || !card?.cvv) {
        return res.status(400).json({ error: 'Dados do cartão incompletos.' });
      }

      const { token } = await tokenizeCard({
        number: card.number.replace(/\s/g, ''),
        holderName: card.holder_name,
        expiryMonth: card.expiry_month,
        expiryYear: card.expiry_year,
        cvv: card.cvv,
      });

      const chargeData = await createCardCharge({
        externalId,
        amountCents: pkg.price_cents,
        cardToken: token,
        customer,
        description,
        device: { ip: req.ip },
      });

      await supabase
        .from('orders')
        .update({ syncpay_transaction_id: chargeData.transaction_id ?? chargeData.id })
        .eq('id', order.id);

      return res.status(201).json({
        order_id: order.id,
        external_id: externalId,
        payment_method: 'credit_card',
        payment_status: 'pending',
        transaction_id: chargeData.transaction_id ?? chargeData.id,
        amount: pkg.price_cents,
      });
    }
  } catch (err) {
    await supabase.from('orders').update({ payment_status: 'failed' }).eq('id', order.id);
    console.error('SyncPay error:', err);
    return res.status(502).json({ error: 'Falha ao processar pagamento.', detail: err.message });
  }
});

// GET /api/orders/:id
router.get('/:id', async (req, res) => {
  const { data, error } = await supabase
    .from('orders')
    .select()
    .or(`id.eq.${req.params.id},external_id.eq.${req.params.id}`)
    .single();

  if (error || !data) return res.status(404).json({ error: 'Pedido não encontrado.' });
  res.json(data);
});

export default router;
