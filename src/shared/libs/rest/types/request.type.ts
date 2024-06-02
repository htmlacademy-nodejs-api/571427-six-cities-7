import type { Request } from 'express';
import type { TRequestParams } from './request.params.type.js';
import type { TRequestBody } from './request-body.type.js';

export type TRequest<T = Record<string, unknown>> = Request<
  TRequestParams,
  TRequestBody,
  T
>;
