import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { ApplicationError } from '../enums/application-error.enum.js';
import { Component } from '../../../constants/index.js';
import { HttpError } from '../errors/index.js';
import { createErrorObject } from '../../../helpers/index.js';

import type { ILogger } from '../../logger/index.js';
import type { NextFunction, Request, Response } from 'express';
import type { IExceptionFilter } from './exception-filter.interface.js';

@injectable()
export class HttpErrorExceptionFilter implements IExceptionFilter {
  constructor(@inject(Component.Logger) private readonly logger: ILogger) {
    this.logger.info('Register HttpErrorExceptionFilter');
  }

  public catch(
    error: unknown,
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    if (!(error instanceof HttpError)) {
      return next(error);
    }

    this.logger.error(
      `[HttpErrorException]: ${req.path} # ${error.message}`,
      error
    );

    res
      .status(StatusCodes.BAD_REQUEST)
      .json(createErrorObject(ApplicationError.CommonError, error.message));
  }
}
