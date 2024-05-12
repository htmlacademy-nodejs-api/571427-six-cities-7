import {
  defaultClasses,
  getModelForClass,
  prop,
  modelOptions,
  Ref
} from '@typegoose/typegoose';

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
  @prop({ required: true, default: '' })
  title!: TOffer['title'];

  @prop({ required: true, default: '' })
  description!: TOffer['description'];

  @prop({ required: true })
  postDate!: TOffer['postDate'];

  @prop({ required: true })
  city!: TOffer['city'];

  @prop({ required: true })
  preview!: TOffer['preview'];

  @prop({ required: true })
  photoes!: TOffer['photoes'];

  @prop({ required: true })
  isPremium!: TOffer['isPremium'];

  @prop({ required: true })
  isFavorite!: TOffer['isFavorite'];

  @prop({ required: true })
  rating!: TOffer['rating'];

  @prop({ required: true })
  housing!: TOffer['housing'];

  @prop({ required: true })
  roomQuantity!: TOffer['roomQuantity'];

  @prop({ required: true })
  guestQuantity!: TOffer['guestQuantity'];

  @prop({ required: true })
  rentCost!: TOffer['rentCost'];

  @prop({ required: true })
  comfort!: TOffer['comfort'];

  @prop({ required: true })
  userId!: Ref<TUser>;

  @prop({ required: true })
  coords!: TOffer['coords'];
}

export const OfferModel = getModelForClass(OfferEntity);
