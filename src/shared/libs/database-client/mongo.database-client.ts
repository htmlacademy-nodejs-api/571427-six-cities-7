import * as Mongoose from 'mongoose';
import { inject, injectable } from 'inversify';
import { Component } from '../../constants/index.js';
import { setTimeout } from 'node:timers/promises';
import { RETRY_COUNT, RETRY_TIMEOUT } from './database-client.constant.js';

import type { IDatabaseClient } from './database-client.interface.js';
import type { ILogger } from '../logger/index.js';

@injectable()
export class MongoDatabaseClient implements IDatabaseClient {
  private mongoose: typeof Mongoose;
  private isConnected: boolean;

  constructor(@inject(Component.Logger) private readonly logger: ILogger) {
    this.isConnected = false;
  }

  isConnectedToDatabase() {
    return this.isConnected;
  }

  async connect(uri: string): Promise<void> {
    if (this.isConnectedToDatabase()) {
      throw new Error('MongoDB client already connected');
    }

    this.logger.info('Trying to connect to MongoDB…');

    let attempt = 0;
    while (attempt < RETRY_COUNT) {
      try {
        this.mongoose = await Mongoose.connect(uri);
        this.isConnected = true;
        this.logger.info('Database connection established.');
        return;
      } catch (error) {
        attempt++;
        this.logger.error(
          `Failed to connect to the database. Attempt ${attempt}`,
          error as Error
        );
        await setTimeout(RETRY_TIMEOUT);
      }
    }

    throw new Error(
      `Unable to establish database connection after ${RETRY_COUNT}`
    );
  }

  async disconnect(): Promise<void> {
    if (!this.isConnectedToDatabase()) {
      throw new Error('Not connected to the database');
    }

    await this.mongoose.disconnect?.();
    this.isConnected = false;
    this.logger.info('Database connection closed.');
  }
}
