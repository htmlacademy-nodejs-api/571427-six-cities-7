import type { NewOffer } from '../../../types/types';

export const postOfferAdapter = (offer: NewOffer) => {
  return {
    title: offer.title,
    description: offer.description,
    city: offer.city.name,
    preview: offer.previewImage,
    photoes: offer.images,
    isPremium: offer.isPremium,
    housing: offer.type,
    roomQuantity: offer.bedrooms,
    guestQuantity: offer.maxAdults,
    rentCost: offer.price,
    comforts: offer.goods
  };
};
