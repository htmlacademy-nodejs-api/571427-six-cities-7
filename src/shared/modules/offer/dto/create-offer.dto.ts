import type { TOffer } from '../../../types/index.js';

export class CreateOfferDto {
  title: TOffer['title'];
  description: TOffer['description'];
  postDate: TOffer['postDate'];
  city: TOffer['city'];
  preview: TOffer['preview'];
  photoes: TOffer['photoes'];
  isPremium: TOffer['isPremium'];
  isFavorite: TOffer['isFavorite'];
  rating: TOffer['rating'];
  housing: TOffer['housing'];
  roomQuantity: TOffer['roomQuantity'];
  guestQuantity: TOffer['guestQuantity'];
  rentCost: TOffer['rentCost'];
  comforts: TOffer['comforts'];
  userId: string;
  coords: TOffer['coords'];
}
