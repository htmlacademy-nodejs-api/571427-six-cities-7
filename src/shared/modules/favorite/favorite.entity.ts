import {
  defaultClasses,
  getModelForClass,
  prop,
  modelOptions,
  Ref
} from '@typegoose/typegoose';
import { UserEntity } from '../user/index.js';

import type { TUser } from '../../types/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface FavoriteEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'favorites',
    timestamps: true
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class FavoriteEntity extends defaultClasses.TimeStamps {
  @prop({ required: true, ref: UserEntity })
  public userId: Ref<TUser>;

  @prop({ default: [] })
  public offerIds: string[];
}

export const FavoriteModel = getModelForClass(FavoriteEntity);
