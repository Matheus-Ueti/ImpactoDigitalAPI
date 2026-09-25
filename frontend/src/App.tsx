import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import MetricsSection from '@/components/sections/MetricsSection';
import PricingSection from '@/components/sections/PricingSection';
import LiveToast from '@/components/ui/LiveToast';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import type { Category } from '@/data/constants';

export default function App() {
  const [activePlatform, setActivePlatform] = useState('instagram');
  const [activeCategory, setActiveCategory] = useState<Category>('followers_mundial');

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 font-sans overflow-x-hidden">
      <LiveToast />
      <WhatsAppButton />

      <Header />

      <main>
        <HeroSection
          activePlatform={activePlatform}
          onPlatformChange={setActivePlatform}
        />
        <MetricsSection />
        <PricingSection
          activePlatform={activePlatform}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </main>

      <Footer />
    </div>
  );
}
