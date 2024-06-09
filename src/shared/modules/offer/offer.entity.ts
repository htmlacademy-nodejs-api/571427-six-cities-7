import {
  defaultClasses,
  getModelForClass,
  prop,
  modelOptions,
  Ref
} from '@typegoose/typegoose';
import { Housing } from '../../enums/index.js';
import {
  MIN_TITLE_LENGTH,
  MAX_TITLE_LENGTH,
  MIN_DESCR_LENGTH,
  MAX_DESCR_LENGTH,
  MIN_PRICE,
  MIN_GUEST_QUANTITY,
  MIN_ROOM_QUANTITY,
  MAX_GUEST_QUANTITY,
  MAX_PRICE,
  MAX_ROOM_QUANTITY
} from '../../constants/index.js';
import { UserEntity } from '../user/index.js';
import { CityEntity } from '../city/index.js';

import type { TOffer, TUser, TCity } from '../../types/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({
    type: String,
    minlength: MIN_TITLE_LENGTH,
    maxlength: MAX_TITLE_LENGTH,
    trim: true
  })
  public title: TOffer['title'];

  @prop({
    type: String,
    minlength: MIN_DESCR_LENGTH,
    maxlength: MAX_DESCR_LENGTH,
    trim: true
  })
  public description: TOffer['description'];

  @prop({ ref: CityEntity })
  public cityId: Ref<TCity>;

  @prop({ type: String })
  public preview: TOffer['preview'];

  @prop()
  public photoes: TOffer['photoes'];

  @prop({ default: false, type: Boolean })
  public isPremium: TOffer['isPremium'];

  @prop({ type: Number })
  public commentsCount: number;

  @prop({ type: Number })
  public sumRating: number;

  @prop({ enum: Housing, type: String })
  public housing: TOffer['housing'];

  @prop({
    min: MIN_ROOM_QUANTITY,
    max: MAX_ROOM_QUANTITY,
    type: Number
  })
  public roomQuantity: TOffer['roomQuantity'];

  @prop({
    min: MIN_GUEST_QUANTITY,
    max: MAX_GUEST_QUANTITY,
    type: Number
  })
  public guestQuantity: TOffer['guestQuantity'];

  @prop({ min: MIN_PRICE, max: MAX_PRICE, type: Number })
  public rentCost: TOffer['rentCost'];

  @prop()
  public comforts: TOffer['comforts'];

  @prop({ ref: UserEntity })
  public userId: Ref<TUser>;
}

export const OfferModel = getModelForClass(OfferEntity);
