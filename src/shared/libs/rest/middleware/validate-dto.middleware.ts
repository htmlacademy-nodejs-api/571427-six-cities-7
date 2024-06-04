import { plainToInstance, type ClassConstructor } from 'class-transformer';
import { validate } from 'class-validator';
import { StatusCodes } from 'http-status-codes';

import type { NextFunction, Request, Response } from 'express';
import type { IMiddleware } from './middleware.interface.js';

export class ValidateDtoMiddleware implements IMiddleware {
  constructor(private dto: ClassConstructor<object>) {}

  async execute(
    { body }: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const dtoInstance = plainToInstance(this.dto, body);
    const errors = await validate(dtoInstance);

    if (errors.length > 0) {
      res.status(StatusCodes.BAD_REQUEST).send(errors);
      return;
    }

    next();
  }
}
