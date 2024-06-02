import type { Request } from 'express';
import type { TRequestBody, TRequestParams } from '../../libs/rest/index.js';
import type { LoginUserDto } from './dto/login-user.dto.js';

export type TLoginUserRequest = Request<
  TRequestParams,
  TRequestBody,
  LoginUserDto
>;
