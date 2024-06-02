import { DocumentType } from '@typegoose/typegoose';
import { CreateCityDto } from './dto/create-city.dto.js';
import { CityEntity } from './city.entity.js';

import type { TNullable } from '../../types/index.js';

export type TDocCityEntity = DocumentType<CityEntity>;

export interface ICityService {
  create(dto: CreateCityDto): Promise<TDocCityEntity>;
  findByCityId(cityId: string): Promise<TNullable<TDocCityEntity>>;
  findByCityName(cityName: string): Promise<TNullable<TDocCityEntity>>;
  findByCityNameOrCreate(
    cityName: string,
    dto: CreateCityDto
  ): Promise<TDocCityEntity>;
}
