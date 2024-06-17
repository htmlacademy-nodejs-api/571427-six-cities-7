import { TUser } from '../../../types/index.js';

export class UpdateUserDto {
  avatar?: TUser['avatar'];
  name?: TUser['name'];
  type?: TUser['type'];
}
