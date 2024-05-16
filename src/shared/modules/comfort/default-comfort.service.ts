import { inject, injectable } from 'inversify';
import { Component } from '../../constants/index.js';

import type { CreateComfortDto } from './dto/create-comfort.dto.js';
import type { ComfortEntity } from './comfort.entity.js';
import type {
  IComfortService,
  TDocComfEntity
} from './comfort-service.interface.js';
import type { types } from '@typegoose/typegoose';
import type { ILogger } from '../../libs/logger/index.js';
import type { TNullable } from '../../types/index.js';

@injectable()
export class DefaultComfortService implements IComfortService {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.ComfortModel)
    private readonly comfortModel: types.ModelType<ComfortEntity>
  ) {}

  async create(dto: CreateComfortDto): Promise<TDocComfEntity> {
    const result = await this.comfortModel.create(dto);
    this.logger.info(`New comfort created: ${dto.name}`);
    return result;
  }

  async findByComfortId(comfortId: string): Promise<TNullable<TDocComfEntity>> {
    return this.comfortModel.findById(comfortId).exec();
  }

  async findByComfortName(
    comfortName: string
  ): Promise<TNullable<TDocComfEntity>> {
    return this.comfortModel.findOne({ name: comfortName }).exec();
  }

  async findByComfortNameOrCreate(
    comfortName: string,
    dto: CreateComfortDto
  ): Promise<TDocComfEntity> {
    const existedComfort = await this.findByComfortName(comfortName);

    if (existedComfort) {
      return existedComfort;
    }

    return this.create(dto);
  }
}
