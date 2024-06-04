import { inject, injectable } from 'inversify';
import { OfferEntity } from './offer.entity.js';
import { Component } from '../../constants/index.js';
import { UpdateOfferDtoInner } from './dto/update-offer.dto.js';
import { SortType } from '../../enums/index.js';
import {
  DEFAULT_OFFER_COUNT,
  DEFAULT_PREMIUM_OFFER_COUNT
} from './offer.constant.js';

import type { types } from '@typegoose/typegoose';
import type {
  IOfferService,
  TDocOfferEntity,
  TGetListFilter,
  TInnerGetListFilter
} from './offer-service.interface.js';
import type { ILogger } from '../../libs/logger/index.js';
import type { TNullable } from '../../types/index.js';
import type { CreateOfferDtoInner } from './dto/create-offer.dto.js';

@injectable()
export class DefaultOfferService implements IOfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.OfferModel)
    private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  async create(dto: CreateOfferDtoInner): Promise<TDocOfferEntity> {
    const result = await this.offerModel.create({
      ...dto,
      commentsCount: 0,
      sumRating: 0
    });

    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  async findById(offerId: string): Promise<TNullable<TDocOfferEntity>> {
    return this.offerModel.findById(offerId).populate('cityId').exec();
  }

  async getList({
    limit = DEFAULT_OFFER_COUNT
  }: Partial<TGetListFilter> = {}): Promise<TDocOfferEntity[]> {
    return this._getList({ limit });
  }

  async findPremiumsByCityId(cityId: string): Promise<TDocOfferEntity[]> {
    return this._getList({
      limit: DEFAULT_PREMIUM_OFFER_COUNT,
      filter: { cityId, isPremium: true }
    });
  }

  private async _getList({
    filter = {},
    limit = DEFAULT_OFFER_COUNT,
    sorting = { createdAt: SortType.Down }
  }: Partial<TInnerGetListFilter>): Promise<TDocOfferEntity[]> {
    return this.offerModel
      .find(filter)
      .populate('cityId')
      .limit(limit)
      .sort(sorting)
      .exec();
  }

  async deleteById(offerId: string): Promise<TNullable<TDocOfferEntity>> {
    const result = await this.offerModel.findByIdAndDelete(offerId).exec();

    if (result) {
      this.logger.info(`Offer deleted. Id: ${offerId}`);
    }

    return result;
  }

  async updateById(
    offerId: string,
    dto: UpdateOfferDtoInner
  ): Promise<TNullable<TDocOfferEntity>> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, { new: true })
      .exec();
  }

  async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel.exists({ _id: documentId })) !== null;
  }

  async updateOfferStatistics(
    offerId: string,
    rating: number
  ): Promise<TNullable<TDocOfferEntity>> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {
        $inc: {
          commentsCount: 1,
          sumRating: rating
        }
      })
      .exec();
  }

  // TODO: жду авторизацию
  // async findFavorites(): Promise<TDocOfferEntity[]> {
  //   return;
  // }
}
