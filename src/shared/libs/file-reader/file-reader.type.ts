type TUserFields = 'name' | 'email' | 'avatar' | 'password' | 'type';

export type TTextFlag = 'true' | 'false';

export type TAvatarValue = 'null' | string;

export type TStringifiedUser = Record<TUserFields, string>;
