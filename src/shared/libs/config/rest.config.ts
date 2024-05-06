import { config } from 'dotenv';
import { inject, injectable } from 'inversify';
import { configRestSchema, type TRestSchema } from './rest.schema.js';
import { Component } from '../../constants/index.js';

import type { ILogger } from '../logger/index.js';
import type { IConfig } from './config.interface.js';

@injectable()
export class RestConfig implements IConfig<TRestSchema> {
  private readonly config: TRestSchema;

  constructor(@inject(Component.Logger) private readonly logger: ILogger) {
    const parsedOutput = config();

    if (parsedOutput.error) {
      throw new Error(
        'Can\'\t read .env file. Perhaps the file does not exists.'
      );
    }

    configRestSchema.load({});
    configRestSchema.validate({ allowed: 'strict', output: this.logger.info });

    this.config = configRestSchema.getProperties();
    this.logger.info('.env file found and successfully parsed!');
  }

  get<T extends keyof TRestSchema>(key: T): TRestSchema[T] {
    return this.config[key];
  }
}
