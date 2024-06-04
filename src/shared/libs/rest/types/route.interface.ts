import type { NextFunction, Request, Response } from 'express';
import type { HttpMethod } from './http-method.enum.js';
import type { IMiddleware } from '../middleware/middleware.interface.js';

export interface IRoute {
  path: string;
  method: HttpMethod;
  handler: (req: Request, res: Response, next: NextFunction) => void;
  middlewares?: IMiddleware[];
}
