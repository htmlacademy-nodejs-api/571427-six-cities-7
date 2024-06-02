import type { CreateCommentDto } from './dto/create-comment.dto.js';
import type { CommentEntity } from './comment.entity.js';
import type { DocumentType } from '@typegoose/typegoose';
import type { TNullable } from '../../types/index.js';

export type TDocCommentEntity = DocumentType<CommentEntity>;

export type TGetListFilter = {
  offerId: string;
  limit: TNullable<number>;
};

export interface ICommentService {
  create(dto: CreateCommentDto): Promise<TDocCommentEntity>;
  getList(filter?: Partial<TGetListFilter>): Promise<TDocCommentEntity[]>;
  deleteByOfferId(offerId: string): Promise<number>;
}
