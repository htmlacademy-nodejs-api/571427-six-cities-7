import type { Comment } from '../../../types/types';
import type { CommentDto } from '../../dto/index';

export const commentAdapter = (comment: CommentDto): Comment => {
  return {
    id: comment.id,
    comment: comment.text,
    date: comment.createdAt.toString(),
    rating: comment.rating,
    user: {
      name: comment.user.name,
      avatarUrl: comment.user.avatar,
      email: comment.user.email,
      type: comment.user.type
    }
  };
};
