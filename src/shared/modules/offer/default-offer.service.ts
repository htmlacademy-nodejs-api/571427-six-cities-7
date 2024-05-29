import { inject, injectable } from 'inversify';
import { OfferEntity } from './offer.entity.js';
import { Component } from '../../constants/index.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { SortType } from '../../enums/index.js';
import { DEFAULT_OFFER_COUNT } from './offer.constant.js';

import type { types } from '@typegoose/typegoose';
import type {
  IOfferService,
  TDocOfferEntity,
  TGetListFilter
} from './offer-service.interface.js';
import type { ILogger } from '../../libs/logger/index.js';
import type { TNullable } from '../../types/index.js';
import type { CreateOfferDto } from './dto/create-offer.dto.js';

@injectable()
export class DefaultOfferService implements IOfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.OfferModel)
    private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  async create(dto: CreateOfferDto): Promise<TDocOfferEntity> {
    const result = await this.offerModel.create(dto);

    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  async findById(offerId: string): Promise<TNullable<TDocOfferEntity>> {
    return this.offerModel.findById(offerId).exec();
  }

  async getList({
    limit = DEFAULT_OFFER_COUNT
  }: Partial<TGetListFilter> = {}): Promise<TDocOfferEntity[]> {
    return this.offerModel
      .aggregate([
        {
          $lookup: {
            from: 'comments',
            let: { offerId: '$_id' },
            pipeline: [
              { $match: { $expr: { $eq: ['$offerId', '$$offerId'] } } },
              {
                $group: {
                  _id: null,
                  averageRating: { $avg: '$rating' },
                  commentsCount: { $sum: 1 }
                }
              }
            ],
            as: 'comments'
          }
        },
        {
          $addFields: {
            averageRating: { $arrayElemAt: ['$comments.averageRating', 0] },
            commentsCount: { $arrayElemAt: ['$comments.commentsCount', 0] }
          }
        },
        {
          $unset: 'comments'
        },
        {
          $limit: limit
        }
      ])
      .sort({ postDate: SortType.Down })
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
    dto: UpdateOfferDto
  ): Promise<TNullable<TDocOfferEntity>> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, { new: true })
      .exec();
  }

  async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel.exists({ _id: documentId })) !== null;
  }

  async incCommentCount(offerId: string): Promise<TNullable<TDocOfferEntity>> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {
        $inc: {
          commentCount: 1
        }
      })
      .exec();
  }

  // TODO: жду авторизацию
  // async findFavorites(): Promise<TDocOfferEntity[]> {
  //   return;
  // }

  // TODO: жду авторизацию
  // async findPremiumsByCity(): Promise<TDocOfferEntity[]> {
  //   return;
  // }
}
