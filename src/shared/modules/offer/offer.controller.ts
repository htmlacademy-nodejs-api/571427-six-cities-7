import { inject, injectable } from 'inversify';
import { Component } from '../../constants/index.js';
import {
  BaseController,
  HttpMethod
  // HttpError
} from '../../libs/rest/index.js';
import { fillDTO } from '../../helpers/index.js';
import { OfferRdo } from './rdo/offer.rdo.js';

import type { Request, Response } from 'express';
import type { ILogger } from '../../libs/logger/index.js';
import type { IOfferService } from './offer-service.interface.js';
import type { TRemoveOfferRequest } from './remove-offer-request.type.js';
import type { ICommentService } from '../comment/index.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: ILogger,
    @inject(Component.OfferService)
    private readonly offerService: IOfferService,
    @inject(Component.CommentService)
    private readonly commentService: ICommentService
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController…');

    this.addRoute({
      path: '/',
      method: HttpMethod.Get,
      handler: this.index
    });

    this.addRoute({
      path: '/',
      method: HttpMethod.Delete,
      handler: this.delete
    });
  }

  async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.getList();
    const responseData = fillDTO(OfferRdo, offers);
    this.ok(res, responseData);
  }

  async delete({ body }: TRemoveOfferRequest, res: Response): Promise<void> {
    const { offerId } = body;
    const result = await this.offerService.deleteById(offerId);

    await this.commentService.deleteByOfferId(offerId);

    this.ok(res, result);
  }
}
