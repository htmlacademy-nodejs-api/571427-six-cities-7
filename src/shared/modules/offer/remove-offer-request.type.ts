import type { Request } from 'express';
import type { TRequestBody, TRequestParams } from '../../libs/rest/index.js';
import type { RemoveOfferDto } from './dto/remove-offer.dto.js';

export type TRemoveOfferRequest = Request<
  TRequestParams,
  TRequestBody,
  RemoveOfferDto
>;
