import { inject } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { HttpError } from '../errors/index.js';
import { getValue } from './utils/get-value.js';
import { Component } from '../../../constants/index.js';

import type { NextFunction, Request, Response } from 'express';
import type { IMiddleware } from './middleware.interface.js';
import type { IOfferService } from '../../../modules/offer/index.js';

export class ValidateAuthorMiddleware implements IMiddleware {
  constructor(
    private readonly queryFieldName: string = 'offerId',
    @inject(Component.OfferService)
    private readonly offerService: IOfferService
  ) {}

  async execute(
    req: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> {
    const value = getValue(req, this.queryFieldName);

    const result = await this.offerService.findById(value as string);

    if (result!.userId.toString() !== req?.tokenPayload.id) {
      throw new HttpError(
        StatusCodes.FORBIDDEN,
        'Forbidden',
        'ValidateAuthorMiddleware'
      );
    }

    return next();
  }
}
