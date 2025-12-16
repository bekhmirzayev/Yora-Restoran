import { LucideIcon } from 'lucide-react';

export interface MenuItem {
  id: number;
  name: string;
  price: string;
  description: string;
  image: string;
  category: string;
}

export interface InfoCardData {
  id: string;
  title: string;
  icon: LucideIcon;
  shortDesc: string;
  detailedDesc: string;
}

export type ActiveTab = 'home' | 'menu' | 'ai-chef' | 'careers' | 'founders';