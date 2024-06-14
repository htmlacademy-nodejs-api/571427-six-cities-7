import { commentAdapter } from './comment.adapter';

import type { Comment } from '../../../types/types';
import type { CommentDto } from '../../dto';

export const listCommentAdapter = (comments: CommentDto[]): Comment[] => {
  return comments.map(commentAdapter);
};
