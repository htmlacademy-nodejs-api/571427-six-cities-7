import type { TUndefined } from './common.type.js';
import type { UserType } from '../enums/index.js';

// TODO: пока что пишу над типом то, как будет валидироваться
// потом уберу, как добавится валидация кодом
export type TUser = {
  // min 1 max 15
  name: string;
  // валидное мыло, проверять через регулярку
  email: string;
  avatar: TUndefined<string>;
  // min 6 max 12
  password: string;
  type: UserType;
};
