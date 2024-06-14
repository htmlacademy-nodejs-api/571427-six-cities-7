import { Expose, Type, Transform } from 'class-transformer';
import { CityRdo } from '../../city/index.js';
import { getAverageRating } from '../utils/get-average-rating.js';
import { UserRdo } from '../../user/rdo/user.rdo.js';

import type { Comfort } from '../../../enums/index.js';

export class DetailOfferRdo {
  @Expose()
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public photoes: string[];

  @Expose()
  public roomQuantity: number;

  @Expose()
  public guestQuantity: number;

  @Expose()
  public comforts: Comfort[];

  @Expose({ name: 'userId' })
  @Type(() => UserRdo)
  public user: string;

  @Expose({ name: 'createdAt' })
  public postDate: Date;

  @Expose({ name: 'cityId' })
  @Type(() => CityRdo)
  public city: CityRdo;

  @Expose()
  public preview: string;

  @Expose()
  public isPremium: boolean;

  @Expose()
  public isFavorite: boolean;

  @Expose()
  @Transform(getAverageRating)
  public rating: number;

  @Expose()
  public housing: string;

  @Expose()
  public rentCost: number;

  @Expose()
  public commentsCount: number;
}
