import { City } from '../enums/index.js';

import type { TCoords } from '../types/index.js';

export const CITY_COORDS: Record<City, TCoords> = {
  [City.Paris]: {
    lat: 48.85661,
    lon: 2.351499
  },
  [City.Cologne]: {
    lat: 50.938361,
    lon: 6.959974
  },
  [City.Brussels]: {
    lat: 50.846557,
    lon: 4.351697
  },
  [City.Amsterdam]: {
    lat: 52.370216,
    lon: 4.895168
  },
  [City.Hamburg]: {
    lat: 53.550341,
    lon: 10.000654
  },
  [City.Dusseldorf]: {
    lat: 51.225402,
    lon: 6.776314
  }
};
