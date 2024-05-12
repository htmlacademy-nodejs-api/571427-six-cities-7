interface IGetMongoURIProps {
  username: string;
  password: string;
  host: string;
  port: string;
  databaseName: string;
}

export function getMongoURI({
  username,
  password,
  host,
  port,
  databaseName
}: IGetMongoURIProps): string {
  return `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=admin`;
}
