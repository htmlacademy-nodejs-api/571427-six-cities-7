import { inject, injectable } from 'inversify';
import { Component } from '../../constants/index.js';
import { CreateFavoriteDto } from './dto/create-favorite.dto.js';

import type { FavoriteEntity } from './favorite.entity.js';
import type {
  IFavService,
  TDocFavEntity,
  TToggleFav
} from './favorite-service.interface.js';
import type { types } from '@typegoose/typegoose';
import type { ILogger } from '../../libs/logger/index.js';
import type { TNullable } from '../../types/index.js';

@injectable()
export class DefaultFavService implements IFavService {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.FavoriteModel)
    private readonly favoriteModel: types.ModelType<FavoriteEntity>
  ) {}

  async create(dto: CreateFavoriteDto): Promise<TDocFavEntity> {
    const result = await this.favoriteModel.create(dto);
    this.logger.info(`Record in favorite doc for user ${dto.userId} created`);
    return result;
  }

  async findByUserId(userId: string): Promise<TNullable<TDocFavEntity>> {
    return this.favoriteModel.findOne({ userId }).exec();
  }

  async addToFavorites({
    userId,
    offerId
  }: TToggleFav): Promise<TDocFavEntity> {
    const existedFav = await this.findByUserId(userId);

    if (!existedFav) {
      return this.create({
        userId,
        offerIds: [offerId]
      });
    }

    if (existedFav.offerIds.includes(offerId)) {
      return existedFav;
    }

    return this.updateOfferIdsByUserId(userId, [
      ...existedFav.offerIds,
      offerId
    ]);
  }

  async removeFromFavorites({
    userId,
    offerId
  }: TToggleFav): Promise<TDocFavEntity | void> {
    const existedFav = await this.findByUserId(userId);
    const offerIds = [...existedFav!.offerIds];

    offerIds.splice(offerIds.indexOf(offerId), 1);

    const result = await this.updateOfferIdsByUserId(userId, offerIds);

    if (result.offerIds.length) {
      return result;
    }

    return this.deleteById(result.id);
  }

  private async updateOfferIdsByUserId(
    userId: string,
    offerIds: string[]
  ): Promise<TDocFavEntity> {
    const updated = await this.favoriteModel.findOneAndUpdate(
      { userId },
      { offerIds },
      { new: true }
    );

    return updated as TDocFavEntity;
  }

  async deleteById(favoriteId: string): Promise<void> {
    await this.favoriteModel.deleteOne({ _id: favoriteId });
  }
}
