import { DocumentType } from '@typegoose/typegoose';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { OfferEntity } from './offer.entity.js';

import type { TNullable } from '../../types/common.type.js';
// import type { City } from '../../enums/index.js';

export type TDocOfferEntity = DocumentType<OfferEntity>;

export type TGetListFilter = {
  limit: number;
};

export interface IOfferService {
  create(dto: CreateOfferDto): Promise<TDocOfferEntity>;
  findById(offerId: string): Promise<TNullable<TDocOfferEntity>>;
  getList(filter: TGetListFilter): Promise<TDocOfferEntity[]>;
  deleteById(offerId: string): Promise<TNullable<TDocOfferEntity>>;
  updateById(
    offerId: string,
    dto: UpdateOfferDto
  ): Promise<TNullable<TDocOfferEntity>>;
  incCommentCount(offerId: string): Promise<TNullable<TDocOfferEntity>>;
  exists(offerId: string): Promise<boolean>;
  // findFavorites(): Promise<TDocOfferEntity[]>;
  // findPremiumsByCity(city: City): Promise<TDocOfferEntity[]>;
}
