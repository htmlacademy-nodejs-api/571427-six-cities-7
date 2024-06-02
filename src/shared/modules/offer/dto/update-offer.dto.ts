import type { TOffer } from '../../../types/index.js';

export class UpdateOfferDtoInner {
  title?: TOffer['title'];
  description?: TOffer['description'];
  cityId?: string;
  preview?: TOffer['preview'];
  photoes?: TOffer['photoes'];
  isPremium?: TOffer['isPremium'];
  housing?: TOffer['housing'];
  roomQuantity?: TOffer['roomQuantity'];
  guestQuantity?: TOffer['guestQuantity'];
  rentCost?: TOffer['rentCost'];
  comforts?: TOffer['comforts'];
}

export class UpdateOfferDto {
  title?: TOffer['title'];
  description?: TOffer['description'];
  city?: TOffer['city'];
  preview?: TOffer['preview'];
  photoes?: TOffer['photoes'];
  isPremium?: TOffer['isPremium'];
  housing?: TOffer['housing'];
  roomQuantity?: TOffer['roomQuantity'];
  guestQuantity?: TOffer['guestQuantity'];
  rentCost?: TOffer['rentCost'];
  comforts?: TOffer['comforts'];
}
