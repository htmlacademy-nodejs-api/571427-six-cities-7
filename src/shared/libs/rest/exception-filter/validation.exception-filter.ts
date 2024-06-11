import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { ApplicationError } from '../enums/application-error.enum.js';
import { Component } from '../../../constants/index.js';
import { ValidationError } from '../errors/index.js';
import { createErrorObject } from '../../../helpers/index.js';

import type { IExceptionFilter } from './exception-filter.interface.js';
import type { ILogger } from '../../logger/index.js';
import type { NextFunction, Request, Response } from 'express';

@injectable()
export class ValidationExceptionFilter implements IExceptionFilter {
  constructor(@inject(Component.Logger) private readonly logger: ILogger) {
    this.logger.info('Register ValidationExceptionFilter');
  }

  public catch(
    error: unknown,
    _req: Request,
    res: Response,
    next: NextFunction
  ): void {
    if (!(error instanceof ValidationError)) {
      return next(error);
    }

    this.logger.error(`[ValidationException]: ${error.message}`, error);

    error.details.forEach((errorField) =>
      this.logger.warn(`[${errorField.property}] — ${errorField.messages}`)
    );

    res
      .status(StatusCodes.BAD_REQUEST)
      .json(
        createErrorObject(
          ApplicationError.ValidationError,
          error.message,
          error.details
        )
      );
  }
}
