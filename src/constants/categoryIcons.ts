// components/categories.ts
import { LucideIcon } from "lucide-react"; // Optional, cleaner typing

import {
  Sun,
  Mountain,
  Droplets,
  Home,
  Sailboat,
  Snowflake,
  TentTree,
  Landmark,
  DoorClosed,
  TreePalm,
  Wind,
  Gem
} from 'lucide-react';

export type Category = {
  label: string;
  icon: LucideIcon; // Better than React.ElementType in this case
  description: string;
};

export const categories: Category[] = [
  {
    label: 'Beach',
    icon: Sun,
    description: 'This property is close to the beach!',
  },
  {
    label: 'Windmills',
    icon: Wind,
    description: 'This property has windmills!',
  },
  {
    label: 'Modern',
    icon: Home,
    description: 'This property is modern!',
  },
  {
    label: 'Countryside',
    icon: Mountain,
    description: 'This property is in the countryside!',
  },
  {
    label: 'Pools',
    icon: Droplets,
    description: 'This property has a beautiful pool!',
  },
  {
    label: 'Lake',
    icon: Sailboat,
    description: 'This property is near a lake!',
  },
  {
    label: 'Skiing',
    icon: Snowflake, // Best Lucide proxy for ski
    description: 'This property has skiing activities!',
  },
  {
    label: 'Castles',
    icon: Landmark,
    description: 'This property is an ancient castle!',
  },
  {
    label: 'Caves',
    icon: DoorClosed,
    description: 'This property is in a spooky cave!',
  },
  {
    label: 'Camping',
    icon: TentTree,
    description: 'This property offers camping activities!',
  },
  {
    label: 'Arctic',
    icon: Snowflake,
    description: 'This property is in an arctic environment!',
  },
  {
    label: 'Desert',
    icon: TreePalm,
    description: 'This property is in the desert!',
  },
  {
    label: 'Barns',
    icon: Home, // No barn, use Home or custom icon
    description: 'This property is in a barn!',
  },
  {
    label: 'Lux',
    icon: Gem,
    description: 'This property is brand new and luxurious!',
  },
];

