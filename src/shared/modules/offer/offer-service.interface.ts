import { DocumentType } from '@typegoose/typegoose';
import { CreateOfferDtoInner } from './dto/create-offer.dto.js';
import { UpdateOfferDtoInner } from './dto/update-offer.dto.js';
import { OfferEntity } from './offer.entity.js';

import type { TNullable } from '../../types/common.type.js';

export type TDocOfferEntity = DocumentType<OfferEntity>;

export type TGetListFilter = {
  limit: number;
};

export interface IOfferService {
  create(dto: CreateOfferDtoInner): Promise<TDocOfferEntity>;
  findById(offerId: string): Promise<TNullable<TDocOfferEntity>>;
  getList(filter?: TGetListFilter): Promise<TDocOfferEntity[]>;
  deleteById(offerId: string): Promise<TNullable<TDocOfferEntity>>;
  updateById(
    offerId: string,
    dto: UpdateOfferDtoInner
  ): Promise<TNullable<TDocOfferEntity>>;
  updateOfferStatistics(
    offerId: string,
    rating: number
  ): Promise<TNullable<TDocOfferEntity>>;
  exists(offerId: string): Promise<boolean>;
  // findFavorites(): Promise<TDocOfferEntity[]>;
  // findPremiumsByCity(city: City): Promise<TDocOfferEntity[]>;
}
