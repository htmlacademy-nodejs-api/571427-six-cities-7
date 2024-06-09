import { DocumentType } from '@typegoose/typegoose';
import { CreateFavoriteDto } from './dto/create-favorite.dto.js';
import { FavoriteEntity } from './favorite.entity.js';

import type { TNullable } from '../../types/index.js';

export type TToggleFav = {
  userId: string;
  offerId: string;
};

export type TDocFavEntity = DocumentType<FavoriteEntity>;

export interface IFavService {
  create(dto: CreateFavoriteDto): Promise<TDocFavEntity>;
  findByUserId(userId: string): Promise<TNullable<TDocFavEntity>>;
  deleteById(favId: string): Promise<void>;
  addToFavorites(options: TToggleFav): Promise<TDocFavEntity>;
  removeFromFavorites(options: TToggleFav): Promise<TDocFavEntity | void>;
}
