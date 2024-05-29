import { Expose } from 'class-transformer';

export class OfferRdo {
  @Expose()
  public title: string;

  @Expose()
  public postDate: Date;

  @Expose()
  public city: string;

  @Expose()
  public preview: string;

  @Expose()
  public isPremium: boolean;

  @Expose()
  public isFavorite: boolean;

  @Expose()
  public averageRating: number;

  @Expose()
  public housing: string;

  @Expose()
  public rentCost: number;

  @Expose()
  public commentsCount: number;
}
