import { Container } from 'inversify';
import { Component } from '../../constants/index.js';
import { DefaultUserService } from './default-user.service.js';
import { UserModel, type UserEntity } from './user.entity.js';

import type { types } from '@typegoose/typegoose';
import type { IUserService } from './user-service.interface.js';

export function createUserContainer() {
  const userContainer = new Container();
  userContainer
    .bind<IUserService>(Component.UserService)
    .to(DefaultUserService)
    .inSingletonScope();

  userContainer
    .bind<types.ModelType<UserEntity>>(Component.UserModel)
    .toConstantValue(UserModel);

  return userContainer;
}
