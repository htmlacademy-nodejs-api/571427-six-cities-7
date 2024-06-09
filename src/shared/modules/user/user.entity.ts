import {
  defaultClasses,
  getModelForClass,
  prop,
  modelOptions
} from '@typegoose/typegoose';
import { createSHA256 } from '../../helpers/index.js';
import {
  MAX_USER_NAME_LENGTH,
  MIN_USER_NAME_LENGTH
} from '../../constants/index.js';
import { UserType } from '../../enums/index.js';

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
    type: String,
    minlength: MIN_USER_NAME_LENGTH,
    maxlength: MAX_USER_NAME_LENGTH,
    trim: true
  })
  public name: TUser['name'];

  @prop({
    required: true,
    type: String,
    unique: true
    // TODO: найти регулярку
    // match: [сюда регулярку, 'Please fill a valid email address']
  })
  public email: TUser['email'];

  @prop({ required: false, type: String })
  public avatar: TUser['avatar'];

  @prop({
    required: true,
    type: String
  })
  public password: TUser['password'];

  @prop({ required: true, type: String, enum: UserType })
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

  verifyPassword(password: string, salt: string) {
    const hashPassword = createSHA256(password, salt);
    return hashPassword === this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
