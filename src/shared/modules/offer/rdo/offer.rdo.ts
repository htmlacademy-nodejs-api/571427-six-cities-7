import { Expose, Type, Transform } from 'class-transformer';
import { CityRdo } from '../../city/index.js';
import { getAverageRating } from '../utils/get-average-rating.js';

export class OfferRdo {
  @Expose()
  public id: string;

  @Expose()
  public title: string;

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
