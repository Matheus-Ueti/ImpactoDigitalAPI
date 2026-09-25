import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  return (
    <button className="fixed bottom-6 right-6 z-50 bg-accent text-accent-foreground p-4 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-110 transition-transform group">
      <MessageCircle size={24} />
      <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border-2 border-background rounded-full" />
      <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-card border border-border px-3 py-1.5 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Suporte Online 24/7
      </div>
    </button>
  );
}
