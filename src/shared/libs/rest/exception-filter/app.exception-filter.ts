import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import { Component } from '../../../constants/index.js';
import { createErrorObject } from '../../../helpers/index.js';
import { ApplicationError } from '../enums/application-error.enum.js';

import type { IExceptionFilter } from './exception-filter.interface.js';
import type { ILogger } from '../../logger/index.js';

@injectable()
export class AppExceptionFilter implements IExceptionFilter {
  constructor(@inject(Component.Logger) private readonly logger: ILogger) {
    this.logger.info('Register AppExceptionFilter');
  }

  catch(error: Error, _req: Request, res: Response, _next: NextFunction): void {
    this.logger.error(error.message, error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(createErrorObject(ApplicationError.ServiceError, error.message));
  }
}
