import { inject, injectable } from 'inversify';
import { Component } from '../../constants/index.js';
import {
  BaseController,
  HttpMethod,
  ValidateDtoMiddleware,
  ValidateObjectExistMiddleware,
  ValidateObjectIdMiddleware,
  PrivateRouteMiddleware,
  ValidateAuthorMiddleware,
  type TRequest
} from '../../libs/rest/index.js';
import { fillDTO } from '../../helpers/index.js';
import { OfferRdo } from './rdo/offer.rdo.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import {
  CommentRdo,
  CreateCommentDto,
  type ICommentService
} from '../comment/index.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { DetailOfferRdo } from './rdo/detail-offer.rdo.js';

import type { Request, Response } from 'express';
import type { ILogger } from '../../libs/logger/index.js';
import type {
  IOfferService,
  TDocOfferEntity
} from './offer-service.interface.js';
import type { RemoveOfferDto } from './dto/remove-offer.dto.js';
import type {
  CityEntity,
  ICityService,
  TDocCityEntity
} from '../city/index.js';
import type { types } from '@typegoose/typegoose';
import type { IFavService, TToggleFav } from '../favorite/index.js';
import type { TNullable } from '../../types/index.js';
import type { TTokenPayload } from '../auth/index.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: ILogger,
    @inject(Component.OfferService)
    private readonly offerService: IOfferService,
    @inject(Component.CommentService)
    private readonly commentService: ICommentService,
    @inject(Component.CityService)
    private readonly cityService: ICityService,
    @inject(Component.CityModel)
    private readonly cityModel: types.ModelType<CityEntity>,
    @inject(Component.FavoriteService)
    private readonly favoriteService: IFavService
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
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateOfferDto)
      ]
    });

    this.addRoute({
      path: '/premiums',
      method: HttpMethod.Get,
      handler: this.indexPremiums,
      middlewares: [
        new ValidateObjectExistMiddleware('name', 'city', this.cityModel)
      ]
    });

    this.addRoute({
      path: '/favorites',
      method: HttpMethod.Get,
      handler: this.indexFavorites,
      middlewares: [new PrivateRouteMiddleware()]
    });

    this.addRoute({
      path: '/favorites',
      method: HttpMethod.Post,
      handler: this.toggleFavorite,
      middlewares: [new PrivateRouteMiddleware()]
    });

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId')
      ]
    });

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [new ValidateObjectIdMiddleware('offerId')]
    });

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateAuthorMiddleware('offerId', this.offerService),
        new ValidateDtoMiddleware(UpdateOfferDto),
        new ValidateObjectIdMiddleware('offerId')
      ]
    });

    this.addRoute({
      path: '/:offerId/comments',
      method: HttpMethod.Post,
      handler: this.createComment,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateCommentDto),
        new ValidateObjectIdMiddleware('offerId')
      ]
    });

    this.addRoute({
      path: '/:offerId/comments',
      method: HttpMethod.Get,
      handler: this.indexComment,
      middlewares: [new ValidateObjectIdMiddleware('offerId')]
    });
  }

  async index({ tokenPayload }: Request, res: Response): Promise<void> {
    const offers = await this.offerService.getList();

    const filledOffers = await this.fillOfferFavStatus(
      offers,
      tokenPayload?.id || null
    );

    const responseData = fillDTO(OfferRdo, filledOffers);
    this.ok(res, responseData);
  }

  async fillOfferFavStatus(
    offers: TDocOfferEntity[],
    userId: TNullable<TTokenPayload['id']>
  ): Promise<TDocOfferEntity[]> {
    if (!offers) {
      return offers;
    }

    const favObj = userId
      ? await this.favoriteService.findByUserId(userId)
      : null;

    return offers.map((offer) => {
      offer.isFavorite = Boolean(favObj?.offerIds.includes(offer.id));

      return offer;
    });
  }

  async delete(req: TRequest<RemoveOfferDto>, res: Response): Promise<void> {
    const offerId = req.params.offerId as string;
    const result = await this.offerService.deleteById(offerId);

    await this.commentService.deleteByOfferId(offerId);

    this.ok(res, result);
  }

  async create(
    { body, tokenPayload }: TRequest<CreateOfferDto>,
    res: Response
  ): Promise<void> {
    const { city, ...updateData } = body;

    const cityObj = await this.cityService.findByCityNameOrCreate(city, {
      name: city
    });

    const result = await this.offerService.create({
      ...updateData,
      cityId: cityObj.id,
      userId: tokenPayload.id
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

  async toggleFavorite(
    { body, tokenPayload }: Request,
    res: Response
  ): Promise<void> {
    const options: TToggleFav = {
      userId: tokenPayload.id,
      offerId: body.offerId
    };

    const result = body.isFavorite
      ? await this.favoriteService.addToFavorites(options)
      : await this.favoriteService.removeFromFavorites(options);

    this.ok(res, result);
  }

  async createComment(
    { params, body, tokenPayload }: TRequest<CreateCommentDto>,
    res: Response
  ): Promise<void> {
    const offerId = params.offerId as string;
    const rating = body.rating;

    const comment = await this.commentService.create({
      offerId,
      rating,
      text: body.text,
      userId: tokenPayload.id
    });

    await this.offerService.updateOfferStatistics(offerId, rating);

    this.ok(res, comment);
  }

  async show(
    { params, tokenPayload }: TRequest<CreateCommentDto>,
    res: Response
  ): Promise<void> {
    const detailsOffer = await this.offerService.findById(
      params.offerId as string
    );

    const filledOffers = detailsOffer
      ? await this.fillOfferFavStatus([detailsOffer], tokenPayload?.id || null)
      : [null];

    const responseData = fillDTO(DetailOfferRdo, filledOffers[0]);
    this.ok(res, responseData);
  }

  async indexPremiums(
    { query, tokenPayload }: TRequest,
    res: Response
  ): Promise<void> {
    const cityObj = await this.cityService.findByCityName(query.city as string);

    const offers = await this.offerService.findPremiumsByCityId(cityObj!.id);

    const filledOffers = await this.fillOfferFavStatus(
      offers,
      tokenPayload?.id || null
    );

    const responseData = fillDTO(OfferRdo, filledOffers);
    this.ok(res, responseData);
  }

  async indexFavorites(
    { tokenPayload }: TRequest,
    res: Response
  ): Promise<void> {
    const favObj = await this.favoriteService.findByUserId(tokenPayload.id);

    const offerIds = favObj?.offerIds;

    if (!offerIds?.length) {
      return this.ok(res, false);
    }

    const offers = await this.offerService.getByOfferIds(offerIds);

    const filledOffers = offers
      ? await this.fillOfferFavStatus(offers, tokenPayload?.id || null)
      : false;

    const responseData = fillDTO(OfferRdo, filledOffers);
    this.ok(res, responseData);
  }
}
