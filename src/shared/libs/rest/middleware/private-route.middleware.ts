import { StatusCodes } from 'http-status-codes';
import { BaseUserException } from '../../../modules/auth/errors/index.js';

import type { NextFunction, Request, Response } from 'express';
import type { IMiddleware } from './middleware.interface.js';

export class PrivateRouteMiddleware implements IMiddleware {
  async execute(
    { tokenPayload }: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> {
    if (!tokenPayload) {
      throw new BaseUserException(
        StatusCodes.UNAUTHORIZED,
        'PrivateRouteMiddleware'
      );
    }

    return next();
  }
}
