import { readFileSync } from 'node:fs';

import type { Coords, Offer, User } from '../../types/index.js';
import type { City, Comfort, Housing, UserType } from '../../enums/index.js';
import type {
  FileReader,
  TextFlag,
  AvatarValue,
  StringifiedUser
} from './file-reader.interface.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(private readonly filename: string) {}

  private validateRawData(): void {
    if (!this.rawData) {
      throw new Error('File was not read');
    }
  }

  private parseRawDataToOffers(): Offer[] {
    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => this.parseLineToOffer(line));
  }

  private parseLineToOffer(line: string): Offer {
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
      photoes: this.getArrFromStr(photoes),
      isPremium: this.getFlag(isPremium as TextFlag),
      isFavorite: this.getFlag(isFavorite as TextFlag),
      rating: this.getIntFromStr(rating),
      housing: housing as Housing,
      roomQuantity: this.getIntFromStr(roomQuantity),
      guestQuantity: this.getIntFromStr(guestQuantity),
      rentCost: this.getIntFromStr(rentCost),
      comfort: this.getArrFromStr<Comfort>(comfort),
      user: this.getUser({
        name: userName,
        email: userEmail,
        avatar: userAvatar,
        password: userPassword,
        type: userType
      }),
      coords: this.getCoordsFromStr(this.cutCRValue(latlon))
    };
  }

  getIntFromStr(str: string): number {
    return Number(str);
  }

  getFlag(flag: TextFlag): boolean {
    return flag === 'true';
  }

  getArrFromStr<Value = string>(str: string): Value[] {
    const strArr = this.separateStrBySemicolon(str);

    return strArr.map((photo) => photo) as Value[];
  }

  getCoordsFromStr(str: string): Coords {
    const [lat, lon] = this.separateStrBySemicolon(str);

    return {
      latitude: this.getIntFromStr(lat),
      longitude: this.getIntFromStr(lon)
    };
  }

  cutCRValue(str: string): string {
    return str.replace('\r', '');
  }

  getUser({ name, email, avatar, password, type }: StringifiedUser): User {
    return {
      name,
      email,
      avatar: this.getAvatar(avatar),
      password,
      type: type as UserType
    };
  }

  separateStrBySemicolon(str: string): string[] {
    return str.split(';');
  }

  getAvatar(str: AvatarValue): User['avatar'] {
    if (str === 'null') {
      return null;
    }

    return str;
  }

  read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  toArray(): Offer[] {
    this.validateRawData();
    return this.parseRawDataToOffers();
  }
}
