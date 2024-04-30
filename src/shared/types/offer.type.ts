import type { TUser } from './user.type.js';
import type { TCoords } from './common.type.js';
import type { City, Housing, Comfort } from '../enums/index.js';

// TODO: пока что пишу над типом то, как будет валидироваться
// потом уберу, как добавится валидация кодом
export type TOffer = {
  // min 10 max 100
  title: string;
  // min 20 max 1024
  description: string;
  postDate: Date;
  city: City;
  // url на превью
  preview: string;
  // массив из 6 url'ов.
  // можно, конечно, написать 6 раз string внутри массива, но так уйдет потенциальная масштабируемость
  photoes: string[];
  isPremium: boolean;
  isFavorite: boolean;
  // от 1 до 5, плюс возможна десятая часть
  rating: number;
  housing: Housing;
  // min 1 max 8
  roomQuantity: number;
  // min 1 max 10
  guestQuantity: number;
  // min 100 max 100_000
  rentCost: number;
  comfort: Comfort[];
  user: TUser;
  coords: TCoords;
};
