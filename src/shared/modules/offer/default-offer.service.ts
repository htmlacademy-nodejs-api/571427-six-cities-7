import { inject, injectable } from 'inversify';
import { OfferEntity } from './offer.entity.js';
import { Component } from '../../constants/index.js';

import type { types } from '@typegoose/typegoose';
import type {
  IOfferService,
  TDocOfferEntity
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
}
