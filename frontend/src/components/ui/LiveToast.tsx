import { useEffect, useState } from 'react';
import { LIVE_TOASTS } from '@/data/constants';

export default function LiveToast() {
  const [toastIndex, setToastIndex] = useState(0);
  const [showToast, setShowToast] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowToast(false);
      setTimeout(() => {
        setToastIndex((prev) => (prev + 1) % LIVE_TOASTS.length);
        setShowToast(true);
      }, 500);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const toast = LIVE_TOASTS[toastIndex];

  return (
    <div
      className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-in-out ${
        showToast ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-card border border-border rounded-full py-2 px-4 shadow-2xl flex items-center gap-3 whitespace-nowrap text-sm">
        <div className="w-2 h-2 rounded-full bg-accent animate-pulse-ring" />
        <span className="font-medium text-foreground">{toast.name}</span>
        <span className="text-muted-foreground">{toast.action}</span>
        <span className="text-xs text-muted-foreground ml-2">{toast.time}</span>
      </div>
    </div>
  );
}
