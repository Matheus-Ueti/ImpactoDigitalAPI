import type { ComponentType } from 'react';
import { Camera, Video } from 'lucide-react';
import KwaiIcon from '@/components/ui/KwaiIcon';

export interface Platform {
  id: string;
  name: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  color: string;
}

export const PLATFORMS: Platform[] = [
  { id: 'instagram', name: 'Instagram', icon: Camera, color: 'hover:text-pink-500 hover:border-pink-500 hover:bg-pink-500/10' },
  { id: 'tiktok', name: 'TikTok', icon: Video, color: 'hover:text-cyan-400 hover:border-cyan-400 hover:bg-cyan-400/10' },
  { id: 'kwai', name: 'Kwai', icon: KwaiIcon, color: 'hover:text-orange-400 hover:border-orange-400 hover:bg-orange-400/10' },
];

export const PACKAGES = {
  followers_mundial: [
    { id: 1,  amount: '100',    price: 'R$ 5,00' },
    { id: 2,  amount: '250',    price: 'R$ 8,00' },
    { id: 3,  amount: '375',    price: 'R$ 12,00' },
    { id: 4,  amount: '500',    price: 'R$ 15,00' },
    { id: 5,  amount: '600',    price: 'R$ 17,00' },
    { id: 6,  amount: '700',    price: 'R$ 19,00' },
    { id: 7,  amount: '800',    price: 'R$ 21,00' },
    { id: 8,  amount: '900',    price: 'R$ 23,00' },
    { id: 9,  amount: '1.000',  price: 'R$ 25,00' },
    { id: 10, amount: '1.500',  price: 'R$ 35,00' },
    { id: 11, amount: '2.000',  price: 'R$ 45,00' },
    { id: 12, amount: '2.500',  price: 'R$ 55,00' },
    { id: 13, amount: '3.000',  price: 'R$ 65,00' },
    { id: 14, amount: '3.500',  price: 'R$ 75,00' },
    { id: 15, amount: '4.000',  price: 'R$ 85,00' },
    { id: 16, amount: '4.500',  price: 'R$ 95,00' },
    { id: 17, amount: '5.000',  price: 'R$ 100,00' },
    { id: 18, amount: '7.000',  price: 'R$ 120,00' },
    { id: 19, amount: '10.000', price: 'R$ 135,00' },
  ],
  followers_br: [
    { id: 20, amount: '100',   price: 'R$ 12,00' },
    { id: 21, amount: '250',   price: 'R$ 30,00' },
    { id: 22, amount: '375',   price: 'R$ 45,00' },
    { id: 23, amount: '500',   price: 'R$ 60,00' },
    { id: 24, amount: '600',   price: 'R$ 65,00' },
    { id: 25, amount: '700',   price: 'R$ 70,00' },
    { id: 26, amount: '800',   price: 'R$ 75,00' },
    { id: 27, amount: '900',   price: 'R$ 80,00' },
    { id: 28, amount: '1.000', price: 'R$ 85,00' },
    { id: 29, amount: '1.500', price: 'R$ 120,00' },
    { id: 30, amount: '2.000', price: 'R$ 150,00' },
    { id: 31, amount: '2.500', price: 'R$ 180,00' },
    { id: 32, amount: '3.000', price: 'R$ 210,00' },
    { id: 33, amount: '3.500', price: 'R$ 240,00' },
    { id: 34, amount: '4.000', price: 'R$ 270,00' },
    { id: 35, amount: '5.000', price: 'R$ 300,00' },
  ],
  likes_mundial: [
    { id: 40, amount: '100',   price: 'R$ 4,00' },
    { id: 41, amount: '250',   price: 'R$ 5,00' },
    { id: 42, amount: '500',   price: 'R$ 8,00' },
    { id: 43, amount: '1.000', price: 'R$ 10,00' },
    { id: 44, amount: '2.000', price: 'R$ 15,00' },
    { id: 45, amount: '3.000', price: 'R$ 22,00' },
    { id: 46, amount: '5.000',  price: 'R$ 30,00' },
    { id: 47, amount: '10.000', price: 'R$ 50,00' },
  ],
  views_reels: [
    { id: 50, amount: '1.000',       price: 'R$ 5,00' },
    { id: 51, amount: '2.000',       price: 'R$ 6,00' },
    { id: 52, amount: '3.000',       price: 'R$ 7,00' },
    { id: 53, amount: '4.000',       price: 'R$ 8,00' },
    { id: 54, amount: '5.000',       price: 'R$ 10,00' },
    { id: 55, amount: '10.000',      price: 'R$ 14,00' },
    { id: 56, amount: '20.000',      price: 'R$ 28,00' },
    { id: 57, amount: '50.000',      price: 'R$ 40,00' },
    { id: 58, amount: '100.000',     price: 'R$ 55,00' },
    { id: 59, amount: '500.000',     price: 'R$ 80,00' },
    { id: 60, amount: '1.000.000',   price: 'R$ 100,00' },
  ],
};

export const LIVE_TOASTS = [
  { name: 'Lucas S.', action: 'comprou 5.000 seguidores', time: 'Agora mesmo' },
  { name: 'Mariana C.', action: 'recebeu 1.000 curtidas', time: 'Há 2 min' },
  { name: 'Pedro H.', action: 'comprou 10.000 visualizações', time: 'Há 5 min' },
];

export type Category = 'followers_mundial' | 'followers_br' | 'likes_mundial' | 'views_reels';
