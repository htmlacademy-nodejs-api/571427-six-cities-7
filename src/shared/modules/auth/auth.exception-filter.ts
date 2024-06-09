import { inject, injectable } from 'inversify';
import { Component } from '../../constants/index.js';
import { BaseUserException } from './errors/index.js';

import type { NextFunction, Request, Response } from 'express';
import type { ILogger } from '../../libs/logger/index.js';
import type { IExceptionFilter } from '../../libs/rest/index.js';

@injectable()
export class AuthExceptionFilter implements IExceptionFilter {
  constructor(@inject(Component.Logger) private readonly logger: ILogger) {
    this.logger.info('Register AuthExceptionFilter');
  }

  catch(
    error: unknown,
    _req: Request,
    res: Response,
    next: NextFunction
  ): void {
    if (!(error instanceof BaseUserException)) {
      return next(error);
    }

    this.logger.error(`[AuthModule] ${error.message}`, error);
    res.status(error.httpStatusCode).json({
      type: 'AUTHORIZATION',
      error: error.message
    });
  }
}
