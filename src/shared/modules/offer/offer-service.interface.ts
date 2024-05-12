import { DocumentType } from '@typegoose/typegoose';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { OfferEntity } from './offer.entity.js';

import type { TNullable } from '../../types/common.type.js';

export type TDocOfferEntity = DocumentType<OfferEntity>;

export interface IOfferService {
  create(dto: CreateOfferDto): Promise<TDocOfferEntity>;
  findById(offerId: string): Promise<TNullable<TDocOfferEntity>>;
}
