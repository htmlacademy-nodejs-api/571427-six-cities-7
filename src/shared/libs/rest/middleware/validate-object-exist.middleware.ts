import { StatusCodes } from 'http-status-codes';
import { HttpError } from '../errors/index.js';
import { HttpMethod } from '../types/http-method.enum.js';

import type { NextFunction, Request, Response } from 'express';
import type { IMiddleware } from './middleware.interface.js';
import type { ReturnModelType } from '@typegoose/typegoose';
import type {
  AnyParamConstructor,
  BeAnObject
} from '@typegoose/typegoose/lib/types.js';

export class ValidateObjectExistMiddleware implements IMiddleware {
  constructor(
    private dbFieldName: string,
    private queryFieldName: string,

    // TODO: повторил интерфейс либы, но линтер ругается на any. мб стоит перейти на вариант из лекции
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private model: ReturnModelType<AnyParamConstructor<any>, BeAnObject>
  ) {}

  async execute(
    req: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> {
    const value = this.getValue(req);

    const item = await this.model
      .findOne({
        [this.dbFieldName]: value
      })
      .exec();

    if (item) {
      return next();
    }

    throw new HttpError(
      StatusCodes.BAD_REQUEST,
      `There is no object named '${value}'`,
      'ValidateObjectExistMiddleware'
    );
  }

  private getValue(req: Request) {
    switch (req.method.toLocaleLowerCase()) {
      case HttpMethod.Get:
        return req.query[this.queryFieldName];
      case HttpMethod.Post:
        return req.params[this.queryFieldName];
      default:
        return req.params[this.queryFieldName];
    }
  }
}
