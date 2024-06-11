import { TUser } from '../../../types/index.js';

export class CreateUserDto {
  email: TUser['email'];
  name: TUser['name'];
  password: TUser['password'];
  type: TUser['type'];
}
