import type { UserType } from '../../../const';
import type { City, Type } from '../../../types/types';

export class OfferDto {
  id!: string;
  title!: string;
  description!: string;
  city!: {
    name: City['name'];
    coords: {
      lat: number;
      lon: number;
    };
  };
  preview!: string;
  isPremium!: boolean;
  isFavorite!: boolean;
  housing!: Type;
  roomQuantity!: number;
  guestQuantity!: number;
  rentCost!: number;
  comforts!: string[];
  rating!: number;
  user!: {
    id: string;
    name: string;
    email: string;
    avatar: string;
    type: UserType;
  };
  photoes!: string[];
}
