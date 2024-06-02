import type { TOffer } from '../../../types/index.js';

export class CreateOfferDto {
  title: TOffer['title'];
  description: TOffer['description'];
  city: TOffer['city'];
  preview: TOffer['preview'];
  photoes: TOffer['photoes'];
  isPremium: TOffer['isPremium'];
  housing: TOffer['housing'];
  roomQuantity: TOffer['roomQuantity'];
  guestQuantity: TOffer['guestQuantity'];
  rentCost: TOffer['rentCost'];
  comforts: TOffer['comforts'];
  // TODO: будет как-то вычисляться после авторизации
  userId: string;
}

export class CreateOfferDtoInner {
  title: TOffer['title'];
  description: TOffer['description'];
  cityId: string;
  preview: TOffer['preview'];
  photoes: TOffer['photoes'];
  isPremium: TOffer['isPremium'];
  housing: TOffer['housing'];
  roomQuantity: TOffer['roomQuantity'];
  guestQuantity: TOffer['guestQuantity'];
  rentCost: TOffer['rentCost'];
  comforts: TOffer['comforts'];
  // TODO: будет как-то вычисляться после авторизации
  userId: string;
}
