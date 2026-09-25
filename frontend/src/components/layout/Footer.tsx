import { ShieldCheck, Timer, TrendingUp } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-foreground font-display font-semibold">
          <TrendingUp className="text-primary w-5 h-5" />
          Boost<span className="text-primary">Social</span>
        </div>
        <div className="flex gap-6">
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-accent" /> Pagamento Seguro
          </span>
          <span className="flex items-center gap-1.5">
            <Timer size={14} className="text-accent" /> Entrega Rápida
          </span>
        </div>
        <p>© {new Date().getFullYear()} BoostSocial. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
