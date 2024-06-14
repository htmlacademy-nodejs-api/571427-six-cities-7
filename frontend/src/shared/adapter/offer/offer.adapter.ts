import type { Offer } from '../../../types/types';
import type { OfferDto } from '../../dto';

export const offerAdapter = (offer: OfferDto): Offer => {
  const location = {
    latitude: offer.city.coords.lat,
    longitude: offer.city.coords.lon
  };

  return {
    id: offer.id,
    price: offer.rentCost,
    rating: offer.rating,
    title: offer.title,
    isPremium: offer.isPremium,
    isFavorite: offer.isFavorite,
    city: {
      name: offer.city.name,
      location
    },
    location,
    previewImage: offer.preview,
    type: offer.housing,
    bedrooms: offer.roomQuantity,
    description: offer.description,
    goods: offer.comforts,
    host: {
      name: offer.user?.name || '',
      avatarUrl: offer.user?.avatar || '',
      type: offer.user?.type || '',
      email: offer.user?.email || ''
    },
    images: offer.photoes,
    maxAdults: offer.guestQuantity
  };
};
