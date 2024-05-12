import type { DocumentType } from '@typegoose/typegoose';
import type { UserEntity } from './user.entity.js';
import type { CreateUserDto } from './dto/create-user.dto.js';
import type { TNullable } from '../../types/index.js';

export type TDocUserEntity = DocumentType<UserEntity>;

export interface IUserService {
  create(dto: CreateUserDto, salt: string): Promise<TDocUserEntity>;
  findByEmail(email: string): Promise<TNullable<TDocUserEntity>>;
  findOrCreate(dto: CreateUserDto, salt: string): Promise<TDocUserEntity>;
}
