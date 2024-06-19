import { StatusCodes } from 'http-status-codes';
import { HttpError } from '../errors/index.js';

import type { NextFunction, Request, Response } from 'express';
import type { IMiddleware } from './middleware.interface.js';
import type { ICityService } from '../../../modules/city/index.js';

export class ValidateCityExistMiddleware implements IMiddleware {
  constructor(
    private cityService: ICityService
  ) {}

  async execute(
    req: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> {
    const cityName = req.query.city as string;
    const item = await this.cityService.findByCityName(cityName);

    if (item) {
      return next();
    }

    throw new HttpError(
      StatusCodes.BAD_REQUEST,
      `There is no city named '${cityName}'`,
      'ValidateObjectExistMiddleware'
    );
  }
}
