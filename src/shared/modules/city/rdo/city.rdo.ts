import { Expose } from 'class-transformer';

import type { TCoords } from '../../../types/index.js';

export class CityRdo {
  @Expose()
  public name: string;

  @Expose()
  public coords: TCoords;
}
