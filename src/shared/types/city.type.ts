import type { City } from '../enums/index.js';
import type { TCoords } from './common.type.js';

export type TCity = {
  name: City;
  coords: TCoords;
};
