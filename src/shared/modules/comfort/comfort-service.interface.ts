import { DocumentType } from '@typegoose/typegoose';
import { CreateComfortDto } from './dto/create-comfort.dto.js';
import { ComfortEntity } from './comfort.entity.js';

import type { TNullable } from '../../types/index.js';

export type TDocComfEntity = DocumentType<ComfortEntity>;

export interface IComfortService {
  create(dto: CreateComfortDto): Promise<TDocComfEntity>;
  findByComfortId(comfortId: string): Promise<TNullable<TDocComfEntity>>;
  findByComfortName(comfortName: string): Promise<TNullable<TDocComfEntity>>;
  findByComfortNameOrCreate(
    comfortName: string,
    dto: CreateComfortDto
  ): Promise<TDocComfEntity>;
}
