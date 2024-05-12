import { Container } from 'inversify';
import { RestApplication } from './rest.application.js';
import { Component } from '../shared/constants/index.js';
import { type ILogger, PinoLogger } from '../shared/libs/logger/index.js';
import {
  RestConfig,
  type IConfig,
  type TRestSchema
} from '../shared/libs/config/index.js';
import {
  type IDatabaseClient,
  MongoDatabaseClient
} from '../shared/libs/database-client/index.js';

export function createRestApplicationContainer() {
  const restApplicationContainer = new Container();

  restApplicationContainer
    .bind<RestApplication>(Component.RestApplication)
    .to(RestApplication)
    .inSingletonScope();
  restApplicationContainer
    .bind<ILogger>(Component.Logger)
    .to(PinoLogger)
    .inSingletonScope();
  restApplicationContainer
    .bind<IConfig<TRestSchema>>(Component.Config)
    .to(RestConfig)
    .inSingletonScope();
  restApplicationContainer
    .bind<IDatabaseClient>(Component.DatabaseClient)
    .to(MongoDatabaseClient)
    .inSingletonScope();

  return restApplicationContainer;
}
