import { injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';
import { Router, type Response } from 'express';

import type { IController } from './controller.interface.js';
import type { ILogger } from '../../logger/index.js';
import type { IRoute } from '../types/route.interface.js';

@injectable()
export abstract class BaseController implements IController {
  private readonly DEFAULT_CONTENT_TYPE = 'application/json';
  private readonly _router: Router;

  constructor(protected readonly logger: ILogger) {
    this._router = Router();
  }

  get router() {
    return this._router;
  }

  addRoute(route: IRoute) {
    const wrapperAsyncHandler = asyncHandler(route.handler.bind(this));

    this._router[route.method](route.path, wrapperAsyncHandler);
    this.logger.info(
      `Route registered: ${route.method.toUpperCase()} ${route.path}`
    );
  }

  send<T>(res: Response, statusCode: number, data: T): void {
    res.type(this.DEFAULT_CONTENT_TYPE).status(statusCode).json(data);
  }

  created<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.CREATED, data);
  }

  noContent<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.NO_CONTENT, data);
  }

  ok<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.OK, data);
  }
}
