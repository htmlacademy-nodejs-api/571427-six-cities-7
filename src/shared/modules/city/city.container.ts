import { Container } from 'inversify';
import { Component } from '../../constants/index.js';
import { DefaultCityService } from './default-city.service.js';
import { CityModel, type CityEntity } from './city.entity.js';

import type { ICityService } from './city-service.interface.js';
import type { types } from '@typegoose/typegoose';

export function createCityContainer() {
  const cityContainer = new Container();

  cityContainer
    .bind<ICityService>(Component.CityService)
    .to(DefaultCityService);
  cityContainer
    .bind<types.ModelType<CityEntity>>(Component.CityModel)
    .toConstantValue(CityModel);

  return cityContainer;
}
