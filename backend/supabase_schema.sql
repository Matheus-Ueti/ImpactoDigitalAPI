-- Cole isso no Supabase: Dashboard → SQL Editor → New query

create table orders (
  id bigint primary key generated always as identity,
  external_id uuid unique not null,
  platform text not null,
  category text not null check (category in ('followers', 'likes', 'views')),
  package_id int not null,
  amount int not null,
  price_cents int not null,
  target text not null,
  payment_method text not null check (payment_method in ('pix', 'credit_card')),
  payment_status text not null default 'pending' check (payment_status in ('pending', 'completed', 'failed', 'refunded')),
  syncpay_transaction_id text,
  syncpay_pix_code text,
  syncpay_pix_expiration text,
  customer_name text not null,
  customer_email text not null,
  customer_cpf text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table webhook_logs (
  id bigint primary key generated always as identity,
  event text not null,
  payload text not null,
  processed_at timestamptz not null default now()
);

-- Atualiza updated_at automaticamente
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger orders_updated_at
  before update on orders
  for each row execute function set_updated_at();
