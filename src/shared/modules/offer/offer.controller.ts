import { inject, injectable } from 'inversify';
import { Component } from '../../constants/index.js';
import {
  BaseController,
  HttpMethod,
  type TRequest
} from '../../libs/rest/index.js';
import { fillDTO } from '../../helpers/index.js';
import { OfferRdo } from './rdo/offer.rdo.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import {
  CommentRdo,
  type CreateCommentDto,
  type ICommentService
} from '../comment/index.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { DetailOfferRdo } from './rdo/detail-offer.rdo.js';

import type { Request, Response } from 'express';
import type { ILogger } from '../../libs/logger/index.js';
import type { IOfferService } from './offer-service.interface.js';
import type { RemoveOfferDto } from './dto/remove-offer.dto.js';
import type { ICityService, TDocCityEntity } from '../city/index.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: ILogger,
    @inject(Component.OfferService)
    private readonly offerService: IOfferService,
    @inject(Component.CommentService)
    private readonly commentService: ICommentService,
    @inject(Component.CityService)
    private readonly cityService: ICityService
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
      method: HttpMethod.Post,
      handler: this.create
    });

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete
    });

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update
    });

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.findById
    });

    this.addRoute({
      path: '/:offerId/comments',
      method: HttpMethod.Post,
      handler: this.createComment
    });

    this.addRoute({
      path: '/:offerId/comments',
      method: HttpMethod.Get,
      handler: this.indexComment
    });
  }

  async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.getList();
    const responseData = fillDTO(OfferRdo, offers);
    this.ok(res, responseData);
  }

  async delete(req: TRequest<RemoveOfferDto>, res: Response): Promise<void> {
    const offerId = req.params.offerId as string;
    const result = await this.offerService.deleteById(offerId);

    await this.commentService.deleteByOfferId(offerId);

    this.ok(res, result);
  }

  async create(
    { body }: TRequest<CreateOfferDto>,
    res: Response
  ): Promise<void> {
    const { city, ...updateData } = body;

    const cityObj = await this.cityService.findByCityNameOrCreate(city, {
      name: city
    });

    const result = await this.offerService.create({
      ...updateData,
      cityId: cityObj.id
    });

    this.ok(res, result);
  }

  async update(
    { params, body }: TRequest<UpdateOfferDto>,
    res: Response
  ): Promise<void> {
    const offerId = params.offerId as string;
    const { city, ...updateData } = body;

    let cityObj: TDocCityEntity | undefined = undefined;

    if (city) {
      cityObj = await this.cityService.findByCityNameOrCreate(city!, {
        name: city!
      });
    }

    const updateOffer = await this.offerService.updateById(offerId, {
      ...updateData,
      cityId: cityObj?.id
    });

    this.ok(res, updateOffer);
  }

  async indexComment(req: Request, res: Response): Promise<void> {
    const offerId = req.params.offerId as string;

    const comments = await this.commentService.getList({ offerId });
    const responseData = fillDTO(CommentRdo, comments);
    this.ok(res, responseData);
  }

  async createComment(
    req: TRequest<CreateCommentDto>,
    res: Response
  ): Promise<void> {
    const offerId = req.params.offerId as string;
    const rating = req.body.rating;

    const comment = await this.commentService.create({
      offerId,
      rating,
      text: req.body.text,
      userId: req.body.userId
    });

    await this.offerService.updateOfferStatistics(offerId, rating);

    this.ok(res, comment);
  }

  async findById(
    { params }: TRequest<CreateCommentDto>,
    res: Response
  ): Promise<void> {
    const detailsOffer = await this.offerService.findById(
      params.offerId as string
    );
    const responseData = fillDTO(DetailOfferRdo, detailsOffer);
    this.ok(res, responseData);
  }
}
