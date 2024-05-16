import { Container } from 'inversify';
import { Component } from '../../constants/index.js';
import { DefaultComfortService } from './default-comfort.service.js';
import { ComfortModel, type ComfortEntity } from './comfort.entity.js';

import type { IComfortService } from './comfort-service.interface.js';
import type { types } from '@typegoose/typegoose';

export function createComfortContainer() {
  const comfortContainer = new Container();

  comfortContainer
    .bind<IComfortService>(Component.ComfortService)
    .to(DefaultComfortService);
  comfortContainer
    .bind<types.ModelType<ComfortEntity>>(Component.ComfortModel)
    .toConstantValue(ComfortModel);

  return comfortContainer;
}
