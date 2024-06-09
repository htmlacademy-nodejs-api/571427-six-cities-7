import { StatusCodes } from 'http-status-codes';
import { HttpError } from '../errors/index.js';

import type { NextFunction, Request, Response } from 'express';
import type { IMiddleware } from './middleware.interface.js';

export class LoginRouteMiddleware implements IMiddleware {
  async execute(
    { tokenPayload }: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> {
    if (tokenPayload) {
      throw new HttpError(
        StatusCodes.METHOD_NOT_ALLOWED,
        'Not allowed',
        'LoginRouteMiddleware'
      );
    }

    return next();
  }
}
