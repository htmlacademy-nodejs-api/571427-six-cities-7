import type { TNullable } from './common.type.js';
import type { UserType } from '../enums/index.js';

// TODO: не очень понял, по ТЗ это изображение в формате .jpg или .png
// пока в качестве типа укажу файл или строку, в дальнейшем удалится это, думаю
type TImage = File | string;

// TODO: пока что пишу над типом то, как будет валидироваться
// потом уберу, как добавится валидация кодом
export type TUser = {
  // min 1 max 15
  name: string;
  // валидное мыло, проверять через регулярку
  email: string;
  avatar: TNullable<TImage>;
  // min 6 max 12
  password: string;
  type: UserType;
};
