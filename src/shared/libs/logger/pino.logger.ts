import { pino, transport, type Logger as PinoInstance } from 'pino';
import { resolve } from 'node:path';
import { injectable } from 'inversify';
import { getCurrentModuleDirectoryPath } from '../../helpers/index.js';

import type { ILogger } from './logger.interface.js';

const LOG_FILE_PATH = 'logs/rest.log';

@injectable()
export class PinoLogger implements ILogger {
  private readonly logger: PinoInstance;

  constructor() {
    const modulePath = getCurrentModuleDirectoryPath();
    const destination = resolve(modulePath, '../../../', LOG_FILE_PATH);

    const multiTransport = transport({
      targets: [
        {
          target: 'pino/file',
          options: { destination },
          level: 'debug'
        },
        {
          target: 'pino/file',
          level: 'info',
          options: {}
        }
      ]
    });

    this.logger = pino({}, multiTransport);
    this.logger.info('Logger created…');
  }

  debug(message: string, ...args: unknown[]): void {
    this.logger.debug(message, ...args);
  }

  error(message: string, error: Error, ...args: unknown[]): void {
    this.logger.error(error, message, ...args);
  }

  info(message: string, ...args: unknown[]): void {
    this.logger.info(message, ...args);
  }

  warn(message: string, ...args: unknown[]): void {
    this.logger.warn(message, ...args);
  }
}
