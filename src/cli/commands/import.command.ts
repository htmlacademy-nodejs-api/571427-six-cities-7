import { TSVFileReader } from '../../shared/libs/file-reader/index.js';
import { getErrorMessage, getMongoURI } from '../../shared/helpers/index.js';

import {
  DefaultUserService,
  UserModel,
  type IUserService
} from '../../shared/modules/user/index.js';
import {
  DefaultOfferService,
  OfferModel,
  type IOfferService
} from '../../shared/modules/offer/index.js';
import {
  MongoDatabaseClient,
  type IDatabaseClient
} from '../../shared/libs/database-client/index.js';
import { ConsoleLogger } from '../../shared/libs/logger/console.logger.js';
import { DEFAULT_DB_PORT } from './command.constant.js';
import {
  DefaultComfortService,
  ComfortModel,
  type IComfortService
} from '../../shared/modules/comfort/index.js';

import type { ILogger } from '../../shared/libs/logger/index.js';
import type { TOffer } from '../../shared/types/offer.type.js';
import type { ICommand } from './command.interface.js';
import type { Comfort } from '../../shared/enums/index.js';

export class ImportCommand implements ICommand {
  private userService: IUserService;
  private offerService: IOfferService;
  private databaseClient: IDatabaseClient;
  private comfortService: IComfortService;
  private logger: ILogger;
  private salt: string;

  constructor() {
    this.logger = new ConsoleLogger();
    this.offerService = new DefaultOfferService(this.logger, OfferModel);
    this.userService = new DefaultUserService(this.logger, UserModel);
    this.comfortService = new DefaultComfortService(this.logger, ComfortModel);
    this.databaseClient = new MongoDatabaseClient(this.logger);
  }

  private onImportedOffer = async (offer: TOffer, resolve: () => void) => {
    await this.saveOffer(offer);
    resolve();
  };

  private onCompleteImport = async (count: number) => {
    console.info(`${count} rows imported.`);
    this.databaseClient.disconnect();
  };

  private async saveOffer(offer: TOffer) {
    const comforts: Comfort[] = [];
    const user = await this.userService.findOrCreate(offer.user, this.salt);

    for (const name of offer.comforts) {
      const existComfort = await this.comfortService.findByComfortNameOrCreate(
        name,
        { name }
      );
      comforts.push(existComfort.id);
    }

    await this.offerService.create({
      title: offer.title,
      description: offer.description,
      postDate: offer.postDate,
      city: offer.city,
      preview: offer.preview,
      photoes: offer.photoes,
      isPremium: offer.isPremium,
      isFavorite: offer.isFavorite,
      rating: offer.rating,
      housing: offer.housing,
      roomQuantity: offer.roomQuantity,
      guestQuantity: offer.guestQuantity,
      rentCost: offer.rentCost,
      comforts,
      userId: user.id,
      coords: offer.coords
    });
  }

  getName(): string {
    return '--import';
  }

  async execute(
    filename: string,
    username: string,
    password: string,
    host: string,
    databaseName: string,
    salt: string
  ): Promise<void> {
    const uri = getMongoURI({
      username,
      password,
      host,
      port: DEFAULT_DB_PORT,
      databaseName
    });

    this.salt = salt;

    await this.databaseClient.connect(uri);

    const fileReader = new TSVFileReader(filename.trim());
    fileReader.on('line', this.onImportedOffer);
    fileReader.on('end', this.onCompleteImport);

    try {
      fileReader.read();
    } catch (error) {
      console.error(`Can't import data from file: ${filename}`);
      console.error(getErrorMessage(error));
    }
  }
}
