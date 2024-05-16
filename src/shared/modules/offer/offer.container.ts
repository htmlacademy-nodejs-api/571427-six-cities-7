import { Container } from 'inversify';
import { Component } from '../../constants/index.js';
import { DefaultOfferService } from './default-offer.service.js';
import { OfferModel, type OfferEntity } from './offer.entity.js';

import type { types } from '@typegoose/typegoose';
import type { IOfferService } from './offer-service.interface.js';

export function createOfferContainer() {
  const userContainer = new Container();
  userContainer
    .bind<IOfferService>(Component.OfferService)
    .to(DefaultOfferService)
    .inSingletonScope();

  userContainer
    .bind<types.ModelType<OfferEntity>>(Component.OfferModel)
    .toConstantValue(OfferModel);

  return userContainer;
}
