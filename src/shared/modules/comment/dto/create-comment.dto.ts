import type { TComment } from '../../../types/index.js';

export class CreateCommentDto {
  text: TComment['text'];
  rating: TComment['rating'];
  offerId: string;
  userId: string;
}
