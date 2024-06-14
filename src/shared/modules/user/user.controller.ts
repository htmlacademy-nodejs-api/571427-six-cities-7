import { inject, injectable } from 'inversify';
import {
  BaseController,
  HttpMethod,
  HttpError,
  UploadFileMiddleware,
  ValidateObjectIdMiddleware,
  PrivateRouteMiddleware,
  LoginRouteMiddleware
} from '../../libs/rest/index.js';
import { StatusCodes } from 'http-status-codes';
import { Component } from '../../constants/index.js';
import { fillDTO } from '../../helpers/index.js';
import { UserRdo } from './rdo/user.rdo.js';
import { LoggedUserRdo } from './rdo/logged-user.rdo.js';
import { UploadUserAvatarRdo } from './rdo/upload-user-avatar.rdo.js';

import type { IConfig, TRestSchema } from '../../libs/config/index.js';
import type { IUserService } from './user-service.interface.js';
import type { Request, Response } from 'express';
import type { ILogger } from '../../libs/logger/index.js';
import type { TCreateUserRequest } from './create-user-request.type.js';
import type { TLoginUserRequest } from './login-user-request.type.js';
import type { IAuthService } from '../auth/index.js';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: ILogger,
    @inject(Component.UserService) private readonly userService: IUserService,
    @inject(Component.Config)
    private readonly configService: IConfig<TRestSchema>,
    @inject(Component.AuthService) private readonly authService: IAuthService
  ) {
    super(logger);
    this.logger.info('Register routes for UserController…');

    this.addRoute({
      path: '/register',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new LoginRouteMiddleware()]
    });

    this.addRoute({
      path: '/login',
      method: HttpMethod.Post,
      handler: this.login,
      middlewares: [new LoginRouteMiddleware()]
    });

    this.addRoute({
      path: '/login',
      method: HttpMethod.Get,
      handler: this.checkAuthenticate,
      middlewares: [new PrivateRouteMiddleware()]
    });

    this.addRoute({
      path: '/:userId/avatar',
      method: HttpMethod.Post,
      handler: this.uploadAvatar,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('userId'),
        new UploadFileMiddleware(
          this.configService.get('UPLOAD_DIRECTORY'),
          'avatar'
        )
      ]
    });
  }

  async create({ body }: TCreateUserRequest, res: Response): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);

    if (existsUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email «${body.email}» exists.`,
        'UserController'
      );
    }

    const result = await this.userService.create(
      body,
      this.configService.get('SALT')
    );
    this.created(res, fillDTO(UserRdo, result));
  }

  async login({ body }: TLoginUserRequest, res: Response): Promise<void> {
    const user = await this.authService.verify(body);
    const token = await this.authService.authenticate(user);
    const responseData = fillDTO(LoggedUserRdo, user);

    this.ok(res, Object.assign(responseData, { token }));
  }

  async checkAuthenticate({ tokenPayload: { email } }: Request, res: Response) {
    const foundedUser = await this.userService.findByEmail(email);

    if (!foundedUser) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'UserController'
      );
    }

    this.ok(res, fillDTO(LoggedUserRdo, foundedUser));
  }

  async uploadAvatar({ params, file }: Request, res: Response) {
    const { userId } = params;
    const uploadFile = { avatar: file?.filename };

    await this.userService.updateById(userId, uploadFile);
    const filledData = fillDTO(UploadUserAvatarRdo, {
      filepath: uploadFile.avatar
    });

    this.created(res, filledData);
  }
}
