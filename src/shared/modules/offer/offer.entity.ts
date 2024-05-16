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
  public title: TOffer['title'];

  @prop({ required: true, default: '' })
  public description: TOffer['description'];

  @prop({ required: true })
  public postDate: TOffer['postDate'];

  @prop({ required: true })
  public city: TOffer['city'];

  @prop({ required: true })
  public preview: TOffer['preview'];

  @prop({ required: true })
  public photoes: TOffer['photoes'];

  @prop({ required: true })
  public isPremium: TOffer['isPremium'];

  @prop({ required: true })
  public isFavorite: TOffer['isFavorite'];

  @prop({ required: true })
  public rating: TOffer['rating'];

  @prop({ required: true })
  public housing: TOffer['housing'];

  @prop({ required: true })
  public roomQuantity: TOffer['roomQuantity'];

  @prop({ required: true })
  public guestQuantity: TOffer['guestQuantity'];

  @prop({ required: true })
  public rentCost: TOffer['rentCost'];

  @prop({ required: true })
  public comforts: TOffer['comforts'];

  @prop({ required: true })
  public userId: Ref<TUser>;

  @prop({ required: true })
  public coords: TOffer['coords'];
}

export const OfferModel = getModelForClass(OfferEntity);
