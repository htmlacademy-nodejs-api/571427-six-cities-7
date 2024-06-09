import {
  MIN_COMMENT_LENGTH,
  MAX_COMMENT_LENGTH,
  MIN_RATING,
  MAX_RATING
} from '../../../constants/index.js';
import {
  IsInt,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength
} from 'class-validator';
import { CreateCommentValidationMessage } from './create-comment.messages.js';

import type { TComment } from '../../../types/index.js';

export class CreateCommentDto {
  @IsString({ message: CreateCommentValidationMessage.text.invalidFormat })
  @MinLength(MIN_COMMENT_LENGTH, {
    message: CreateCommentValidationMessage.text.minLength
  })
  @MaxLength(MAX_COMMENT_LENGTH, {
    message: CreateCommentValidationMessage.text.maxLength
  })
  public text: TComment['text'];

  @IsInt({ message: CreateCommentValidationMessage.rating.invalidFormat })
  @Min(MIN_RATING, {
    message: CreateCommentValidationMessage.rating.minValue
  })
  @Max(MAX_RATING, {
    message: CreateCommentValidationMessage.rating.maxValue
  })
  public rating: TComment['rating'];

  public userId: string;
}

export class CreateCommentDtoInner {
  text: TComment['text'];
  rating: TComment['rating'];
  userId: string;
  offerId: string;
}
