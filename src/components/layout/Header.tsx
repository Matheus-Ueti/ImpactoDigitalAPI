import { Gift, RefreshCw, Search, TrendingUp } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="text-primary w-6 h-6" />
            <span className="font-display font-bold text-xl tracking-tight">
              Boost<span className="text-primary">Social</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-2 bg-accent/10 text-accent px-2.5 py-1 rounded-full text-xs font-medium border border-accent/20">
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Sistemas Online
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <a href="#seguidores" className="hover:text-foreground transition-colors">Seguidores</a>
          <a href="#curtidas" className="hover:text-foreground transition-colors">Curtidas</a>
          <a href="#visualizacoes" className="hover:text-foreground transition-colors">Visualizações</a>
          <a href="#reposicao" className="hover:text-foreground transition-colors flex items-center gap-1">
            <RefreshCw size={14} /> Reposição
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center bg-secondary border border-border rounded-lg overflow-hidden h-9">
            <input
              type="text"
              placeholder="ID ou Link do pedido..."
              className="bg-transparent border-none outline-none px-3 text-sm w-48 text-foreground placeholder:text-muted-foreground focus:ring-0"
            />
            <button className="px-3 hover:bg-muted transition-colors h-full">
              <Search size={14} className="text-muted-foreground" />
            </button>
          </div>
          <a
            href="#teste-gratis"
            className="hidden sm:flex bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 px-4 h-9 items-center justify-center rounded-lg text-sm font-medium transition-colors gap-2"
          >
            <Gift size={14} /> Teste Grátis
          </a>
        </div>
      </div>
    </header>
  );
}
