import 'reflect-metadata';

import { Container } from 'inversify';
import { RestApplication } from './rest/index.js';
import { Component } from './shared/constants/index.js';
import { createRestApplicationContainer } from './rest/rest.container.js';
import { createUserContainer } from './shared/modules/user/index.js';
import { createOfferContainer } from './shared/modules/offer/index.js';
import { createComfortContainer } from './shared/modules/comfort/index.js';

async function bootstrap() {
  const appContainer = Container.merge(
    createRestApplicationContainer(),
    createUserContainer(),
    createComfortContainer(),
    createOfferContainer()
  );

  const application = appContainer.get<RestApplication>(
    Component.RestApplication
  );
  await application.init();
}

bootstrap();
