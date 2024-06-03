import {
  MIN_COMMENT_LENGTH,
  MAX_COMMENT_LENGTH,
  MIN_RATING,
  MAX_RATING
} from '../../../constants/index.js';

export const CreateCommentValidationMessage = {
  text: {
    invalidFormat: 'Field text must be string',
    minLength: `Minimum text length must be ${MIN_COMMENT_LENGTH}`,
    maxLength: `Maximum text length must be ${MAX_COMMENT_LENGTH}`
  },
  rating: {
    invalidFormat: 'Field rating must be integer',
    minValue: `Minimum rating must be ${MIN_RATING}`,
    maxValue: `Maximum rating must be ${MAX_RATING}`
  },
  userId: {
    invalidId: 'Field userId field must be a valid id'
  }
} as const;
