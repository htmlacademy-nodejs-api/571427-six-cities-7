import { TSVFileReader } from '../../shared/libs/file-reader/index.js';
import { getErrorMessage } from '../../shared/helpers/index.js';

import type { TOffer } from '../../shared/types/offer.type.js';
import type { ICommand } from './command.interface.js';

export class ImportCommand implements ICommand {
  private onImportedOffer = (offer: TOffer) => {
    console.info(offer);
  };

  private onCompleteImport = (count: number) => {
    console.info(`${count} rows imported.`);
  };

  getName(): string {
    return '--import';
  }

  execute(...parameters: string[]): void {
    const [filename] = parameters;
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
