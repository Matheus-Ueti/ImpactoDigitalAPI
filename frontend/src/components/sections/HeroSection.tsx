import { PLATFORMS } from '@/data/constants';

interface HeroSectionProps {
  activePlatform: string;
  onPlatformChange: (id: string) => void;
}

export default function HeroSection({ activePlatform, onPlatformChange }: HeroSectionProps) {
  return (
    <section className="relative pt-24 pb-20 overflow-hidden" id="inicio">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight">
            Cresça suas redes sociais <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-fuchsia-500">
              na velocidade da luz
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Mais de 10.000 pedidos entregues. Seguidores e curtidas reais entregues em segundos, sem necessidade de senha.
          </p>

          <div className="flex gap-3 justify-center">
            {PLATFORMS.map((platform) => {
              const Icon = platform.icon;
              const isActive = activePlatform === platform.id;
              return (
                <button
                  key={platform.id}
                  onClick={() => onPlatformChange(platform.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl border transition-all duration-200 font-medium ${
                    isActive
                      ? 'bg-secondary border-primary/50 text-foreground'
                      : 'bg-transparent border-border text-muted-foreground ' + platform.color
                  }`}
                >
                  <Icon size={20} />
                  {platform.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
