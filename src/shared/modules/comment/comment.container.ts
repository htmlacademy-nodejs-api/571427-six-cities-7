import { Container } from 'inversify';
import { Component } from '../../constants/index.js';
import { DefaultCommentService } from './default-comment.service.js';
import { CommentModel, type CommentEntity } from './comment.entity.js';
import { CommentController } from './comment.controller.js';

import type { types } from '@typegoose/typegoose';
import type { ICommentService } from './comment-service.interface.js';
import type { IController } from '../../libs/rest/index.js';

export function createCommentContainer() {
  const commentContainer = new Container();
  commentContainer
    .bind<ICommentService>(Component.CommentService)
    .to(DefaultCommentService)
    .inSingletonScope();

  commentContainer
    .bind<types.ModelType<CommentEntity>>(Component.CommentModel)
    .toConstantValue(CommentModel);

  commentContainer
    .bind<IController>(Component.CommentController)
    .to(CommentController)
    .inSingletonScope();

  return commentContainer;
}
