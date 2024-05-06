import { inject, injectable } from 'inversify';
import { Component } from '../shared/constants/index.js';

import type { ILogger } from '../shared/libs/logger/index.js';
import type { IConfig, TRestSchema } from '../shared/libs/config/index.js';

@injectable()
export class RestApplication {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.Config) private readonly config: IConfig<TRestSchema>
  ) {}

  async init() {
    this.logger.info('Application initialization');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);
  }
}
