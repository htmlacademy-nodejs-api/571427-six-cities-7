import EventEmitter from 'node:events';
import { createReadStream } from 'node:fs';

import type { TCoords, TOffer } from '../../types/index.js';
import type { City, Comfort, Housing, UserType } from '../../enums/index.js';
import type { IFileReader } from './file-reader.interface.js';

const CHUNK_SIZE = 16384;

const getCoordsFromStr = (str: string): TCoords => {
  const [lat, lon] = str.split(';');

  return {
    lat: Number(lat),
    lon: Number(lon)
  };
};

export class TSVFileReader extends EventEmitter implements IFileReader {
  constructor(private readonly filename: string) {
    super();
  }

  private parseLineToOffer(line: string): TOffer {
    const [
      title,
      description,
      postDate,
      city,
      preview,
      photoes,
      isPremium,
      isFavorite,
      rating,
      housing,
      roomQuantity,
      guestQuantity,
      rentCost,
      comfort,
      userName,
      userEmail,
      userAvatar,
      userPassword,
      userType,
      latlon
    ] = line.split('\t');

    return {
      title,
      description,
      postDate: new Date(postDate),
      city: city as City,
      preview,
      photoes: photoes.split(';'),
      isPremium: isPremium === 'true',
      isFavorite: isFavorite === 'true',
      rating: Number(rating),
      housing: housing as Housing,
      roomQuantity: Number(roomQuantity),
      guestQuantity: Number(guestQuantity),
      rentCost: Number(rentCost),
      comfort: comfort.split(';') as Comfort[],
      user: {
        name: userName,
        email: userEmail,
        avatar: userAvatar === 'null' ? null : userAvatar,
        password: userPassword,
        type: userType as UserType
      },
      coords: getCoordsFromStr(this.cutCRValue(latlon))
    };
  }

  cutCRValue(str: string) {
    return str.replace('\r', '');
  }

  async read() {
    const readStream = createReadStream(this.filename, {
      highWaterMark: CHUNK_SIZE,
      encoding: 'utf-8'
    });

    let remainingData = '';
    let nextLinePosition = -1;
    let importedRowCount = 0;

    for await (const chunk of readStream) {
      remainingData += chunk.toString();

      while ((nextLinePosition = remainingData.indexOf('\n')) >= 0) {
        const completeRow = remainingData.slice(0, nextLinePosition + 1);
        remainingData = remainingData.slice(++nextLinePosition);
        importedRowCount++;

        const parsedOffer = this.parseLineToOffer(completeRow);
        this.emit('line', parsedOffer);
      }
    }

    this.emit('end', importedRowCount);
  }
}
