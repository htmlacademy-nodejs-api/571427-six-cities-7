import type { Request } from 'express';
import type { TRequestBody, TRequestParams } from '../../libs/rest/index.js';
import type { CreateUserDto } from './dto/create-user.dto.js';

export type TCreateUserRequest = Request<
  TRequestParams,
  TRequestBody,
  CreateUserDto
>;
