import { HttpMethod } from '../../types/http-method.enum.js';

import type { Request } from 'express';

export const getValue = (req: Request, queryFieldName: string) => {
  switch (req.method.toLocaleLowerCase()) {
    case HttpMethod.Get:
      return req.query[queryFieldName];
    case HttpMethod.Post:
      return req.params[queryFieldName];
    default:
      return req.params[queryFieldName];
  }
};
