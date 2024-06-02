import { inject, injectable } from 'inversify';
import { CITY_COORDS, Component } from '../../constants/index.js';
import { City } from '../../enums/index.js';

import type { CreateCityDto } from './dto/create-city.dto.js';
import type { CityEntity } from './city.entity.js';
import type { ICityService, TDocCityEntity } from './city-service.interface.js';
import type { types } from '@typegoose/typegoose';
import type { ILogger } from '../../libs/logger/index.js';
import type { TNullable } from '../../types/index.js';

@injectable()
export class DefaultCityService implements ICityService {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.CityModel)
    private readonly cityModel: types.ModelType<CityEntity>
  ) {}

  async create(dto: CreateCityDto): Promise<TDocCityEntity> {
    const result = await this.cityModel.create({
      ...dto,
      coords: CITY_COORDS[dto.name as City]
    });
    this.logger.info(`New city created: ${dto.name}`);
    return result;
  }

  async findByCityId(cityId: string): Promise<TNullable<TDocCityEntity>> {
    return this.cityModel.findById(cityId).exec();
  }

  async findByCityName(cityName: string): Promise<TNullable<TDocCityEntity>> {
    return this.cityModel.findOne({ name: cityName }).exec();
  }

  async findByCityNameOrCreate(
    cityName: string,
    dto: CreateCityDto
  ): Promise<TDocCityEntity> {
    const existedCity = await this.findByCityName(cityName);

    if (existedCity) {
      return existedCity;
    }

    return this.create(dto);
  }
}
