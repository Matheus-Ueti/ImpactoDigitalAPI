import { Zap } from 'lucide-react';
import { PLATFORMS } from '@/data/constants';

interface HeroSectionProps {
  activePlatform: string;
  onPlatformChange: (id: string) => void;
}

export default function HeroSection({ activePlatform, onPlatformChange }: HeroSectionProps) {
  return (
    <section className="relative pt-24 pb-20 overflow-hidden" id="teste-gratis">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 blur-[120px] rounded-full pointer-events-none opacity-50" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight">
            Cresça suas redes sociais <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-fuchsia-500">
              na velocidade da luz
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Mais de 10.000 pedidos entregues. Teste agora nossa qualidade enviando seguidores ou curtidas reais para o seu perfil em segundos.
          </p>

          <div className="bg-card/50 backdrop-blur-xl border border-border p-6 md:p-8 rounded-2xl max-w-xl mx-auto shadow-2xl relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

            <div className="space-y-6">
              <div className="flex flex-col items-center gap-2">
                <span className="text-sm font-semibold tracking-wider text-primary uppercase">Passo 1: Escolha a rede</span>
                <div className="flex gap-3 w-full justify-center">
                  {PLATFORMS.map((platform) => {
                    const Icon = platform.icon;
                    const isActive = activePlatform === platform.id;
                    return (
                      <button
                        key={platform.id}
                        onClick={() => onPlatformChange(platform.id)}
                        className={`flex-1 flex flex-col items-center gap-2 py-4 rounded-xl border transition-all duration-200 ${
                          isActive
                            ? 'bg-secondary border-primary/50 text-foreground'
                            : 'bg-transparent border-border text-muted-foreground ' + platform.color
                        }`}
                      >
                        <Icon size={24} />
                        <span className="text-xs font-medium">{platform.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3">
                <span className="text-sm font-semibold tracking-wider text-primary uppercase block text-center">
                  Passo 2: Qual perfil?
                </span>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">@</span>
                    <input
                      type="text"
                      placeholder="seu.usuario"
                      className="w-full bg-secondary border border-border rounded-xl h-12 pl-8 pr-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-muted-foreground"
                    />
                  </div>
                  <button className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 px-8 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 whitespace-nowrap shadow-[0_0_15px_rgba(139,92,246,0.4)]">
                    <Zap size={18} className="fill-current" />
                    Enviar Teste
                  </button>
                </div>
                <p className="text-xs text-muted-foreground text-center">Nenhuma senha necessária. Seguro e anônimo.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
