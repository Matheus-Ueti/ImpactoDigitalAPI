import { Star, Timer, Users } from 'lucide-react';

const METRICS = [
  { icon: Timer, value: '2m 30s', label: 'Tempo médio de entrega' },
  { icon: Users, value: '10.5k+', label: 'Pedidos finalizados' },
  { icon: Star, value: '4.9/5', label: 'Satisfação dos clientes', fill: true },
];

export default function MetricsSection() {
  return (
    <section className="py-12 border-y border-border bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-border">
          {METRICS.map(({ icon: Icon, value, label, fill }) => (
            <div key={label} className="flex flex-col items-center gap-2 py-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-2">
                <Icon size={24} className={fill ? 'fill-current' : ''} />
              </div>
              <h3 className="font-display font-bold text-3xl">{value}</h3>
              <p className="text-sm text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
