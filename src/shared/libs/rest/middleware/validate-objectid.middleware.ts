import { Types } from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import { HttpError } from '../errors/index.js';

import type { NextFunction, Request, Response } from 'express';
import type { IMiddleware } from './middleware.interface.js';

export class ValidateObjectIdMiddleware implements IMiddleware {
  constructor(private param: string) {}

  execute({ params }: Request, _res: Response, next: NextFunction): void {
    const objectId = params[this.param];

    if (Types.ObjectId.isValid(objectId)) {
      return next();
    }

    throw new HttpError(
      StatusCodes.BAD_REQUEST,
      `${objectId} is invalid ObjectID`,
      'ValidateObjectIdMiddleware'
    );
  }
}
