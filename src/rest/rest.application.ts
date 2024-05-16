import { inject, injectable } from 'inversify';
import { Component } from '../shared/constants/index.js';
import { getMongoURI } from '../shared/helpers/database.js';

import type { ILogger } from '../shared/libs/logger/index.js';
import type { IConfig, TRestSchema } from '../shared/libs/config/index.js';
import type { IDatabaseClient } from '../shared/libs/database-client/database-client.interface.js';

@injectable()
export class RestApplication {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.Config) private readonly config: IConfig<TRestSchema>,
    @inject(Component.DatabaseClient)
    private readonly databaseClient: IDatabaseClient
  ) {}

  private async initDb() {
    const mongoUri = getMongoURI({
      username: this.config.get('DB_USER'),
      password: this.config.get('DB_PASSWORD'),
      host: this.config.get('DB_HOST'),
      port: this.config.get('DB_PORT'),
      databaseName: this.config.get('DB_NAME')
    });

    return this.databaseClient.connect(mongoUri);
  }

  async init() {
    this.logger.info('Application initialization');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);

    this.logger.info('Init database…');

    await this.initDb();

    this.logger.info('Init database completed');
  }
}
