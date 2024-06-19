import { inject } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { HttpError } from '../errors/index.js';
import { Component } from '../../../constants/index.js';

import type { NextFunction, Request, Response } from 'express';
import type { IMiddleware } from './middleware.interface.js';
import type { IOfferService } from '../../../modules/offer/index.js';

export class ValidateOfferAuthorMiddleware implements IMiddleware {
  constructor(
    @inject(Component.OfferService)
    private readonly offerService: IOfferService
  ) {}

  async execute(
    req: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> {
    const result = await this.offerService.findById(req.params.offerId as string);

    if (result!.userId.id !== req?.tokenPayload.id) {
      throw new HttpError(
        StatusCodes.FORBIDDEN,
        'Forbidden',
        'ValidateOfferAuthorMiddleware'
      );
    }

    return next();
  }
}
