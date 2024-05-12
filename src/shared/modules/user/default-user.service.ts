import { UserEntity } from './user.entity.js';
import { inject, injectable } from 'inversify';
import { Component } from '../../constants/index.js';

import type { ILogger } from '../../libs/logger/index.js';
import type { types } from '@typegoose/typegoose';
import type { CreateUserDto } from './dto/create-user.dto.js';
import type { IUserService, TDocUserEntity } from './user-service.interface.js';
import type { TNullable } from '../../types/index.js';

@injectable()
export class DefaultUserService implements IUserService {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.UserModel)
    private readonly userModel: types.ModelType<UserEntity>
  ) {}

  async create(dto: CreateUserDto, salt: string): Promise<TDocUserEntity> {
    const user = new UserEntity(dto);
    user.setPassword(dto.password, salt);

    const result = await this.userModel.create(user);
    this.logger.info(`New user created: ${user.email}`);

    return result;
  }

  async findByEmail(email: string): Promise<TNullable<TDocUserEntity>> {
    return this.userModel.findOne({ email });
  }

  async findOrCreate(
    dto: CreateUserDto,
    salt: string
  ): Promise<TDocUserEntity> {
    const existedUser = await this.findByEmail(dto.email);

    if (existedUser) {
      return existedUser;
    }

    return this.create(dto, salt);
  }
}
