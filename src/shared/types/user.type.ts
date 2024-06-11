import type { TNullable } from './common.type.js';
import type { UserType } from '../enums/index.js';

export type TUser = {
  name: string;
  email: string;
  avatar?: TNullable<string>;
  password: string;
  type: UserType;
};
