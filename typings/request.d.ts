import type { TTokenPayload } from '../src/shared/modules/auth/index.js';

declare module 'express-serve-static-core' {
  export interface Request {
    tokenPayload: TTokenPayload;
  }
}
