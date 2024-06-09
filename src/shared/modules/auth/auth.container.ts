import { Container } from 'inversify';
import { Component } from '../../constants/index.js';
import { DefaultAuthService } from './default-auth.service.js';
import { AuthExceptionFilter } from './auth.exception-filter.js';

import type { IAuthService } from './auth-service.interface.js';
import type { IExceptionFilter } from '../../libs/rest/index.js';

export function createAuthContainer() {
  const authContainer = new Container();
  authContainer
    .bind<IAuthService>(Component.AuthService)
    .to(DefaultAuthService)
    .inSingletonScope();
  authContainer
    .bind<IExceptionFilter>(Component.AuthExceptionFilter)
    .to(AuthExceptionFilter)
    .inSingletonScope();

  return authContainer;
}
