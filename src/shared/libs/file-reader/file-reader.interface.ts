type UserFields = 'name' | 'email' | 'avatar' | 'password' | 'type';

export interface FileReader {
  read(): void;
}

export type TextFlag = 'true' | 'false';

export type AvatarValue = 'null' | string;

export type StringifiedUser = Record<UserFields, string>;
