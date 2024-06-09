import { Container } from 'inversify';
import { Component } from '../../constants/index.js';
import { DefaultFavService } from './default-favorite.service.js';
import { FavoriteModel, type FavoriteEntity } from './favorite.entity.js';

import type { IFavService } from './favorite-service.interface.js';
import type { types } from '@typegoose/typegoose';

export function createFavoriteContainer() {
  const comfortContainer = new Container();

  comfortContainer
    .bind<IFavService>(Component.FavoriteService)
    .to(DefaultFavService);
  comfortContainer
    .bind<types.ModelType<FavoriteEntity>>(Component.FavoriteModel)
    .toConstantValue(FavoriteModel);

  return comfortContainer;
}
