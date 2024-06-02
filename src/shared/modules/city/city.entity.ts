import {
  defaultClasses,
  getModelForClass,
  modelOptions,
  prop
} from '@typegoose/typegoose';

import type { City } from '../../enums/index.js';
import type { TCoords } from '../../types/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface CityEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'cities',
    timestamps: true
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class CityEntity extends defaultClasses.TimeStamps {
  @prop({ required: true, trim: true, unique: true })
  public name: City;

  @prop({ required: true })
  public coords: TCoords;
}

export const CityModel = getModelForClass(CityEntity);
