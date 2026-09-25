import { useState } from 'react';
import { Check, Eye, ShieldCheck, ShoppingCart } from 'lucide-react';
import { PACKAGES, type Category } from '@/data/constants';
import CheckoutModal from '@/components/ui/CheckoutModal';

interface PricingSectionProps {
  activePlatform: string;
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
}

const CATEGORY_LABELS: Record<Category, string> = {
  followers: 'Seguidores',
  likes: 'Curtidas',
  views: 'Visualizações',
};

const CATEGORY_PLACEHOLDER: Record<Category, string> = {
  followers: 'Usuário',
  likes: 'Link do post',
  views: 'Link do vídeo',
};

const TABS: { key: Category; label: string }[] = [
  { key: 'followers', label: 'Seguidores' },
  { key: 'likes', label: 'Curtidas' },
  { key: 'views', label: 'Visualizações' },
];

interface SelectedPkg {
  id: number;
  amount: string;
  price: string;
  target: string;
}

export default function PricingSection({ activePlatform, activeCategory, onCategoryChange }: PricingSectionProps) {
  const packages = PACKAGES[activeCategory];
  const categoryLabel = CATEGORY_LABELS[activeCategory];
  const placeholder = CATEGORY_PLACEHOLDER[activeCategory];
  const [targets, setTargets] = useState<Record<number, string>>({});
  const [selectedPkg, setSelectedPkg] = useState<SelectedPkg | null>(null);

  function handleBuy(pkg: (typeof packages)[number]) {
    const target = targets[pkg.id] ?? '';
    if (!target.trim()) {
      const input = document.querySelector<HTMLInputElement>(`[data-pkg="${pkg.id}"]`);
      input?.focus();
      return;
    }
    setSelectedPkg({ id: pkg.id, amount: pkg.amount, price: pkg.price, target });
  }

  return (
    <section className="py-24 relative" id="seguidores">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold">Escolha seu pacote</h2>
          <p className="text-muted-foreground">
            Crescimento real e imediato com garantia de reposição. Escolha a categoria e o tamanho do pacote ideal para você.
          </p>

          <div className="inline-flex bg-secondary p-1 rounded-xl border border-border mt-6">
            {TABS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => onCategoryChange(key)}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeCategory === key
                    ? 'bg-background shadow-sm text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative flex flex-col p-6 rounded-2xl border transition-all duration-300 ${
                pkg.popular
                  ? 'bg-card border-primary/50 shadow-[0_0_30px_rgba(139,92,246,0.15)] md:-translate-y-4'
                  : 'bg-card/50 border-border hover:border-muted-foreground/30'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-fuchsia-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                  Mais Vendido - {pkg.discount}
                </div>
              )}

              <div className="mb-6">
                <span className="text-muted-foreground font-medium text-sm">Pacote de</span>
                <h3 className="text-3xl font-display font-bold mt-1 text-foreground">
                  {pkg.amount}{' '}
                  <span className="text-lg font-normal text-muted-foreground">{categoryLabel}</span>
                </h3>
              </div>

              <div className="mb-6 space-y-1">
                <div className="text-muted-foreground line-through text-sm">{pkg.oldPrice}</div>
                <div className="text-4xl font-display font-bold text-foreground">{pkg.price}</div>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-center gap-3 text-sm">
                  <Check size={16} className="text-accent flex-shrink-0" />
                  <span>Início imediato (0-5 min)</span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <Check size={16} className="text-accent flex-shrink-0" />
                  <span>Alta qualidade e estabilidade</span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <Check size={16} className="text-accent flex-shrink-0" />
                  <span>Sem necessidade de senha</span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <ShieldCheck size={16} className="text-accent flex-shrink-0" />
                  <span>Garantia de reposição de 30 dias</span>
                </li>
                {activeCategory === 'views' && (
                  <li className="flex items-center gap-3 text-sm">
                    <Eye size={16} className="text-accent flex-shrink-0" />
                    <span>Compatível com Reels e Stories</span>
                  </li>
                )}
              </ul>

              <div className="space-y-3 mt-auto">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium text-sm">
                    {activeCategory === 'followers' ? '@' : '🔗'}
                  </span>
                  <input
                    data-pkg={pkg.id}
                    type="text"
                    placeholder={placeholder}
                    value={targets[pkg.id] ?? ''}
                    onChange={(e) => setTargets((prev) => ({ ...prev, [pkg.id]: e.target.value }))}
                    className="w-full bg-secondary border border-border rounded-lg h-10 pl-8 pr-3 text-sm focus:outline-none focus:border-primary transition-all placeholder:text-muted-foreground/60"
                  />
                </div>
                <button
                  onClick={() => handleBuy(pkg)}
                  className={`w-full h-10 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                    pkg.popular
                      ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
                      : 'bg-secondary hover:bg-secondary/80 text-foreground border border-border'
                  }`}
                >
                  <ShoppingCart size={16} />
                  Comprar Agora
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedPkg && (
        <CheckoutModal
          platform={activePlatform}
          category={activeCategory}
          pkg={selectedPkg}
          onClose={() => setSelectedPkg(null)}
        />
      )}
    </section>
  );
}
