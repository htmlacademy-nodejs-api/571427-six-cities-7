import {
  defaultClasses,
  getModelForClass,
  prop,
  modelOptions,
  Ref
} from '@typegoose/typegoose';
import { City, Housing } from '../../enums/index.js';
import {
  MIN_TITLE_LENGTH,
  MAX_TITLE_LENGTH,
  MIN_DESCR_LENGTH,
  MAX_DESCR_LENGTH,
  MIN_PRICE,
  MIN_GUEST_QUANTITY,
  MIN_RATING,
  MIN_ROOM_QUANTITY,
  MAX_GUEST_QUANTITY,
  MAX_PRICE,
  MAX_RATING,
  MAX_ROOM_QUANTITY
} from '../../constants/index.js';
import { UserEntity } from '../user/user.entity.js';

import type { TOffer, TUser } from '../../types/index.js';

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
    required: true,
    type: String,
    minlength: MIN_TITLE_LENGTH,
    maxlength: MAX_TITLE_LENGTH,
    trim: true
  })
  public title: TOffer['title'];

  @prop({
    required: true,
    type: String,
    minlength: MIN_DESCR_LENGTH,
    maxlength: MAX_DESCR_LENGTH,
    trim: true
  })
  public description: TOffer['description'];

  @prop({ required: true, type: Date })
  public postDate: TOffer['postDate'];

  @prop({ required: true, type: String, enum: City })
  public city: TOffer['city'];

  @prop({ required: true, type: String })
  public preview: TOffer['preview'];

  @prop({ required: true, type: () => [String] })
  public photoes: TOffer['photoes'];

  @prop({ required: true, default: false, type: Boolean })
  public isPremium: TOffer['isPremium'];

  @prop({ required: true, default: false, type: Boolean })
  public isFavorite: TOffer['isFavorite'];

  // TODO: нужно будет удалить, т.к. рейтинг будет считаться на основе комментов
  @prop({ required: true, min: MIN_RATING, max: MAX_RATING, type: Number })
  public rating: TOffer['rating'];

  @prop({ required: true, enum: Housing, type: String })
  public housing: TOffer['housing'];

  @prop({
    required: true,
    min: MIN_ROOM_QUANTITY,
    max: MAX_ROOM_QUANTITY,
    type: Number
  })
  public roomQuantity: TOffer['roomQuantity'];

  @prop({
    required: true,
    min: MIN_GUEST_QUANTITY,
    max: MAX_GUEST_QUANTITY,
    type: Number
  })
  public guestQuantity: TOffer['guestQuantity'];

  @prop({ required: true, min: MIN_PRICE, max: MAX_PRICE, type: Number })
  public rentCost: TOffer['rentCost'];

  @prop({ required: true, type: () => [String] })
  public comforts: TOffer['comforts'];

  @prop({ required: true, ref: UserEntity })
  public userId: Ref<TUser>;

  @prop({ required: true })
  public coords: TOffer['coords'];
}

export const OfferModel = getModelForClass(OfferEntity);
