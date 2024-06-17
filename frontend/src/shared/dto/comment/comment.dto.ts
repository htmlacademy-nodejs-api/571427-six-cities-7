import type { UserType } from '../../../const';

export class CommentDto {
  id!: string;
  createdAt!: Date;
  text!: string;
  rating!: number;
  user!: {
    id: string;
    name: string;
    email: string;
    avatar: string;
    type: UserType;
  };
  offerId!: string;
}
