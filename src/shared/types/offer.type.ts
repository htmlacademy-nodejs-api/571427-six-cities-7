import type { TUser } from './user.type.js';
import type { TCoords } from './common.type.js';
import type { City, Housing, Comfort } from '../enums/index.js';

export type TOffer = {
  title: string;
  description: string;
  postDate: Date;
  city: City;
  preview: string;
  photoes: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  housing: Housing;
  roomQuantity: number;
  guestQuantity: number;
  rentCost: number;
  comforts: Comfort[];
  user: TUser;
  coords: TCoords;
};
