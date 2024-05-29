import { inject, injectable } from 'inversify';
import { BaseController, HttpMethod } from '../../libs/rest/index.js';
import { Component } from '../../constants/index.js';
import { fillDTO } from '../../helpers/index.js';
import { CommentRdo } from './rdo/comment.rdo.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';

import type { ILogger } from '../../libs/logger/index.js';
import type { Request, Response } from 'express';
import type { ICommentService } from './comment-service.interface.js';

@injectable()
export class CommentController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: ILogger,
    @inject(Component.CommentService)
    private readonly commentService: ICommentService
  ) {
    super(logger);

    this.logger.info('Register routes for CommentController…');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
  }

  async index(_req: Request, res: Response): Promise<void> {
    const comments = await this.commentService.getList();
    const responseData = fillDTO(CommentRdo, comments);
    this.ok(res, responseData);
  }

  async create(
    {
      body
    }: Request<
      Record<string, unknown>,
      Record<string, unknown>,
      CreateCommentDto
    >,
    res: Response
  ): Promise<void> {
    const comment = await this.commentService.create(body);
    this.ok(res, comment);
  }
}
