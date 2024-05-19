import {
  defaultClasses,
  getModelForClass,
  prop,
  modelOptions
} from '@typegoose/typegoose';
import { createSHA256 } from '../../helpers/index.js';
import {
  MAX_USER_NAME_LENGTH,
  MIN_USER_NAME_LENGTH,
  MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH
} from '../../constants/index.js';

import type { TUser } from '../../types/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps implements TUser {
  @prop({
    required: true,
    default: '',
    min: MIN_USER_NAME_LENGTH,
    max: MAX_USER_NAME_LENGTH,
    trim: true
  })
  public name: TUser['name'];

  @prop({
    required: true,
    unique: true
    // TODO: найти регулярку
    // match: [сюда регулярку, 'Please fill a valid email address']
  })
  public email: TUser['email'];

  @prop({ required: false, default: '' })
  public avatar: TUser['avatar'];

  @prop({
    required: true,
    default: '',
    min: MIN_PASSWORD_LENGTH,
    max: MAX_PASSWORD_LENGTH
  })
  public password: TUser['password'];

  @prop({ required: true })
  public type: TUser['type'];

  constructor(userData: TUser) {
    super();

    this.email = userData.email;
    this.avatar = userData.avatar;
    this.name = userData.name;
    this.password = userData.password;
    this.type = userData.type;
  }

  setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
