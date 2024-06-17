import { offerAdapter } from './offer.adapter';

import type { Offer } from '../../../types/types';
import type { OfferDto } from '../../dto';

export const listOfferAdapter = (offers: OfferDto[]): Offer[] => {
  return offers.map(offerAdapter);
};
