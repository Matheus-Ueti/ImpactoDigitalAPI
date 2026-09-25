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
  followers_mundial: 'Seguidores Mundiais',
  followers_br: 'Seguidores Brasileiros',
  likes_mundial: 'Curtidas Mundiais',
  views_reels: 'Views Reels',
};

const CATEGORY_PLACEHOLDER: Record<Category, string> = {
  followers_mundial: 'Usuário',
  followers_br: 'Usuário',
  likes_mundial: 'Link do post',
  views_reels: 'Link do Reel',
};

const TABS: { key: Category; label: string }[] = [
  { key: 'followers_mundial', label: 'Seg. Mundial' },
  { key: 'followers_br', label: 'Seg. Brasileiro' },
  { key: 'likes_mundial', label: 'Curtidas' },
  { key: 'views_reels', label: 'Views Reels' },
];

const SHARED_FEATURES = [
  { icon: Check, label: 'Início imediato (0–5 min)' },
  { icon: Check, label: 'Alta qualidade e estabilidade' },
  { icon: Check, label: 'Sem necessidade de senha' },
  { icon: ShieldCheck, label: 'Garantia de reposição de 30 dias' },
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

  const isFollowers = activeCategory === 'followers_mundial' || activeCategory === 'followers_br';
  const prefix = isFollowers ? '@' : '🔗';


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
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold">Escolha seu pacote</h2>
          <p className="text-muted-foreground">
            Crescimento real e imediato com garantia de reposição. Escolha a categoria e o tamanho do pacote ideal para você.
          </p>

          <div className="inline-flex flex-wrap justify-center bg-secondary p-1 rounded-xl border border-border gap-1 mt-6">
            {TABS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => onCategoryChange(key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
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

        {/* Benefícios compartilhados */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-8 max-w-3xl mx-auto">
          {SHARED_FEATURES.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon size={14} className="text-accent flex-shrink-0" />
              <span>{label}</span>
            </div>
          ))}
          {activeCategory === 'views_reels' && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Eye size={14} className="text-accent flex-shrink-0" />
              <span>Compatível com Reels e Stories</span>
            </div>
          )}
        </div>

        {/* Grade de pacotes */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-w-6xl mx-auto">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="flex flex-col p-4 rounded-xl border bg-card/50 border-border hover:border-primary/40 hover:bg-card transition-all duration-200"
            >
              <div className="mb-3">
                <span className="text-xs text-muted-foreground">{categoryLabel}</span>
                <p className="text-xl font-display font-bold text-foreground leading-tight">{pkg.amount}</p>
                <p className="text-primary font-bold text-base mt-0.5">{pkg.price}</p>
              </div>

              <div className="space-y-2 mt-auto">
                <div className="relative">
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-medium">
                    {prefix}
                  </span>
                  <input
                    data-pkg={pkg.id}
                    type="text"
                    placeholder={placeholder}
                    value={targets[pkg.id] ?? ''}
                    onChange={(e) => setTargets((prev) => ({ ...prev, [pkg.id]: e.target.value }))}
                    className="w-full bg-secondary border border-border rounded-lg h-8 pl-6 pr-2 text-xs focus:outline-none focus:border-primary transition-all placeholder:text-muted-foreground/60"
                  />
                </div>
                <button
                  onClick={() => handleBuy(pkg)}
                  className="w-full h-8 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1 bg-secondary hover:bg-primary hover:text-primary-foreground border border-border hover:border-primary"
                >
                  <ShoppingCart size={13} />
                  Comprar
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
