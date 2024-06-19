import {
  MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH
} from '../../../constants/index.js';
import { HttpError } from '../errors/index.js';
import { StatusCodes } from 'http-status-codes';

import type { Response, NextFunction } from 'express';
import type { IMiddleware } from './middleware.interface.js';
import type { TRequest } from '../types/request.type.js';
import type { CreateUserDto } from '../../../modules/user/index.js';

export class ValidatePasswordMiddleware implements IMiddleware {
  async execute(
    { body }: TRequest<CreateUserDto>,
    _res: Response,
    next: NextFunction
  ): Promise<void> {
    const passwordLength = body.password.length;

    if (
      passwordLength > MAX_PASSWORD_LENGTH ||
      passwordLength < MIN_PASSWORD_LENGTH
    ) {
      new HttpError(
        StatusCodes.BAD_REQUEST,
        `Password must be greater than ${MIN_PASSWORD_LENGTH} and less than ${MAX_PASSWORD_LENGTH}`,
        'ValidatePasswordMiddleware'
      );
    }

    next();
  }
}
