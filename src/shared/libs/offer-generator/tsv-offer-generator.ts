import dayjs from 'dayjs';
import {
  generateRandomValue,
  getRandomItem,
  getRandomItems
} from '../../helpers/index.js';
import { UserType } from '../../enums/user-type.enum.js';
import {
  FIRST_WEEK_DAY,
  LAST_WEEK_DAY
} from './tsv-offer-generator.constants.js';
import {
  CITY_COORDS,
  MIN_PRICE,
  MIN_GUEST_QUANTITY,
  MIN_RATING,
  MIN_ROOM_QUANTITY,
  MAX_GUEST_QUANTITY,
  MAX_PRICE,
  MAX_RATING,
  MAX_ROOM_QUANTITY
} from '../../constants/index.js';

import type { TMockServerData } from '../../types/index.js';
import type { IOfferGenerator } from './offer-generator.interface.js';

export class TSVOfferGenerator implements IOfferGenerator {
  constructor(private readonly mockData: TMockServerData) {}

  generate(): string {
    const title = getRandomItem(this.mockData.titles);
    const description = getRandomItem(this.mockData.descriptions);
    const city = getRandomItem(this.mockData.cities);
    const preview = getRandomItem(this.mockData.previews);
    const photoes = getRandomItems(this.mockData.photoes).join(';');
    const isPremium = getRandomItem(['true', 'false']);
    const isFavorite = getRandomItem(['true', 'false']);
    const rating = generateRandomValue(MIN_RATING, MAX_RATING).toString();
    const housing = getRandomItem(this.mockData.housings);

    const roomQuantity = generateRandomValue(
      MIN_ROOM_QUANTITY,
      MAX_ROOM_QUANTITY
    ).toString();
    const guestQuantity = generateRandomValue(
      MIN_GUEST_QUANTITY,
      MAX_GUEST_QUANTITY
    ).toString();

    const rentCost = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const comforts = getRandomItems(this.mockData.comforts).join(';');
    const userName = getRandomItem(this.mockData.names);
    const userEmail = getRandomItem(this.mockData.emails);
    const userAvatar = getRandomItem(this.mockData.avatars);
    const userPassword = getRandomItem(this.mockData.passwords);
    const userType = getRandomItem([UserType.Pro, UserType.Regular]);

    const { lat, lon } = CITY_COORDS[city];

    const latlon = `${lat};${lon}`;
    const postDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();

    return [
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
      comforts,
      userName,
      userEmail,
      userAvatar,
      userPassword,
      userType,
      latlon
    ].join('\t');
  }
}
