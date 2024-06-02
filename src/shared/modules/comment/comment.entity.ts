import {
  defaultClasses,
  getModelForClass,
  prop,
  modelOptions,
  Ref
} from '@typegoose/typegoose';
import { UserEntity } from '../user/user.entity.js';
import { OfferEntity } from '../offer/offer.entity.js';
import {
  MAX_COMMENT_LENGTH,
  MAX_RATING,
  MIN_COMMENT_LENGTH,
  MIN_RATING
} from '../../constants/index.js';

import type { TUser, TOffer, TComment } from '../../types/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'comments',
    timestamps: true
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class CommentEntity extends defaultClasses.TimeStamps {
  @prop({
    required: true,
    type: String,
    minlength: MIN_COMMENT_LENGTH,
    maxlength: MAX_COMMENT_LENGTH
  })
  public text: TComment['text'];

  @prop({ required: true, min: MIN_RATING, max: MAX_RATING, type: Number })
  public rating: TComment['rating'];

  @prop({ required: true, ref: UserEntity })
  public userId: Ref<TUser>;

  @prop({ required: true, ref: OfferEntity })
  public offerId: Ref<TOffer>;
}

export const CommentModel = getModelForClass(CommentEntity);
