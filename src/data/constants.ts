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
  followers: [
    { id: 1, amount: '1.000', price: 'R$ 19,90', oldPrice: 'R$ 29,90', popular: false },
    { id: 2, amount: '5.000', price: 'R$ 69,90', oldPrice: 'R$ 99,90', popular: true, discount: '30% OFF' },
    { id: 3, amount: '10.000', price: 'R$ 119,90', oldPrice: 'R$ 189,90', popular: false },
  ],
  likes: [
    { id: 4, amount: '500', price: 'R$ 9,90', oldPrice: 'R$ 14,90', popular: false },
    { id: 5, amount: '9.000', price: 'R$ 29,90', oldPrice: 'R$ 49,90', popular: true, discount: '40% OFF' },
    { id: 6, amount: '5.000', price: 'R$ 59,90', oldPrice: 'R$ 89,90', popular: false },
  ],
  views: [
    { id: 7, amount: '1.000', price: 'R$ 7,90', oldPrice: 'R$ 12,90', popular: false },
    { id: 8, amount: '10.000', price: 'R$ 39,90', oldPrice: 'R$ 59,90', popular: true, discount: '35% OFF' },
    { id: 9, amount: '50.000', price: 'R$ 89,90', oldPrice: 'R$ 139,90', popular: false },
  ],
};

export const LIVE_TOASTS = [
  { name: 'Lucas S.', action: 'comprou 5.000 seguidores', time: 'Agora mesmo' },
  { name: 'Mariana C.', action: 'recebeu 1.000 curtidas', time: 'Há 2 min' },
  { name: 'Pedro H.', action: 'comprou 10.000 visualizações', time: 'Há 5 min' },
];

export type Category = 'followers' | 'likes' | 'views';
