import { inject, injectable } from 'inversify';
import { Component } from '../../constants/index.js';
import { DEFAULT_COMMENTS_COUNT } from './comment.constant.js';
import { SortType } from '../../enums/index.js';

import type { types } from '@typegoose/typegoose';
import type { ILogger } from '../../libs/logger/index.js';
import type {
  ICommentService,
  TDocCommentEntity,
  TGetListFilter,
  TGetListProperties
} from './comment-service.interface.js';
import type { CommentEntity } from './comment.entity.js';
import type { CreateCommentDto } from './dto/create-comment.dto.js';

@injectable()
export class DefaultCommentService implements ICommentService {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.OfferModel)
    private readonly commentModel: types.ModelType<CommentEntity>
  ) {}

  async create(dto: CreateCommentDto): Promise<TDocCommentEntity> {
    const result = await this.commentModel.create(dto);

    this.logger.info(`New comment with rating ${dto.rating} created`);

    return result;
  }

  async getList(
    { offerId }: TGetListFilter,
    properties?: Partial<TGetListProperties>
  ): Promise<TDocCommentEntity[]> {
    return this.commentModel
      .find(
        { offerId },
        {},
        { limit: properties?.limit ?? DEFAULT_COMMENTS_COUNT }
      )
      .populate(['userId'])
      .sort({ postDate: SortType.Down })
      .exec();
  }

  async deleteByOfferId(offerId: string): Promise<number> {
    const result = await this.commentModel.deleteMany({ offerId }).exec();

    return result.deletedCount;
  }
}
