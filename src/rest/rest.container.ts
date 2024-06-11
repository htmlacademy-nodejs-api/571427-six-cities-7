import { Container } from 'inversify';
import { RestApplication } from './rest.application.js';
import { Component } from '../shared/constants/index.js';
import {
  AppExceptionFilter,
  HttpErrorExceptionFilter,
  ValidationExceptionFilter,
  type IExceptionFilter
} from '../shared/libs/rest/index.js';
import { PinoLogger, type ILogger } from '../shared/libs/logger/index.js';
import {
  RestConfig,
  type IConfig,
  type TRestSchema
} from '../shared/libs/config/index.js';
import {
  type IDatabaseClient,
  MongoDatabaseClient
} from '../shared/libs/database-client/index.js';
import { PathTransformer } from '../shared/libs/rest/index.js';

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
  restApplicationContainer
    .bind<IExceptionFilter>(Component.ExceptionFilter)
    .to(AppExceptionFilter)
    .inSingletonScope();
  restApplicationContainer
    .bind<IExceptionFilter>(Component.HttpExceptionFilter)
    .to(HttpErrorExceptionFilter)
    .inSingletonScope();
  restApplicationContainer
    .bind<IExceptionFilter>(Component.ValidationExceptionFilter)
    .to(ValidationExceptionFilter)
    .inSingletonScope();
  restApplicationContainer
    .bind<PathTransformer>(Component.PathTransformer)
    .to(PathTransformer)
    .inSingletonScope();

  return restApplicationContainer;
}
