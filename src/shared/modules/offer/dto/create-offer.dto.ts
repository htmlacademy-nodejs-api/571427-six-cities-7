import {
  MIN_TITLE_LENGTH,
  MAX_TITLE_LENGTH,
  MIN_DESCR_LENGTH,
  MAX_DESCR_LENGTH,
  MIN_ROOM_QUANTITY,
  MAX_ROOM_QUANTITY,
  MIN_GUEST_QUANTITY,
  MAX_GUEST_QUANTITY,
  MIN_PRICE,
  MAX_PRICE
} from '../../../constants/index.js';
import { CreateOfferValidationMessage } from './create-offer.messages.js';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsBoolean,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength
} from 'class-validator';
import { City, Housing } from '../../../enums/index.js';

import type { TOffer } from '../../../types/index.js';

export class CreateOfferDto {
  @IsString({ message: CreateOfferValidationMessage.title.invalidFormat })
  @MinLength(MIN_TITLE_LENGTH, {
    message: CreateOfferValidationMessage.title.minLength
  })
  @MaxLength(MAX_TITLE_LENGTH, {
    message: CreateOfferValidationMessage.title.maxLength
  })
  public title: TOffer['title'];

  @IsString({ message: CreateOfferValidationMessage.description.invalidFormat })
  @MinLength(MIN_DESCR_LENGTH, {
    message: CreateOfferValidationMessage.description.minLength
  })
  @MaxLength(MAX_DESCR_LENGTH, {
    message: CreateOfferValidationMessage.description.maxLength
  })
  public description: TOffer['description'];

  @IsEnum(City, { message: CreateOfferValidationMessage.city.invalid })
  public city: TOffer['city'];

  @IsString({
    message: CreateOfferValidationMessage.preview.invalidFormat
  })
  public preview: TOffer['preview'];

  @IsArray({ message: CreateOfferValidationMessage.photoes.invalidFormat })
  @IsString({ each: true })
  public photoes: TOffer['photoes'];

  @IsBoolean({ message: CreateOfferValidationMessage.isPremium.invalidFormat })
  public isPremium: TOffer['isPremium'];

  @IsEnum(Housing, { message: CreateOfferValidationMessage.housing.invalid })
  public housing: TOffer['housing'];

  @IsInt({ message: CreateOfferValidationMessage.roomQuantity.invalidFormat })
  @Min(MIN_ROOM_QUANTITY, {
    message: CreateOfferValidationMessage.roomQuantity.minValue
  })
  @Max(MAX_ROOM_QUANTITY, {
    message: CreateOfferValidationMessage.roomQuantity.maxValue
  })
  public roomQuantity: TOffer['roomQuantity'];

  @IsInt({ message: CreateOfferValidationMessage.guestQuantity.invalidFormat })
  @Min(MIN_GUEST_QUANTITY, {
    message: CreateOfferValidationMessage.guestQuantity.minValue
  })
  @Max(MAX_GUEST_QUANTITY, {
    message: CreateOfferValidationMessage.guestQuantity.maxValue
  })
  public guestQuantity: TOffer['guestQuantity'];

  @IsInt({ message: CreateOfferValidationMessage.rentCost.invalidFormat })
  @Min(MIN_PRICE, {
    message: CreateOfferValidationMessage.rentCost.minValue
  })
  @Max(MAX_PRICE, {
    message: CreateOfferValidationMessage.rentCost.maxValue
  })
  public rentCost: TOffer['rentCost'];

  @IsArray()
  @IsString({ each: true })
  public comforts: TOffer['comforts'];
}

export class CreateOfferDtoInner {
  title: TOffer['title'];
  description: TOffer['description'];
  cityId: string;
  preview: TOffer['preview'];
  photoes: TOffer['photoes'];
  isPremium: TOffer['isPremium'];
  housing: TOffer['housing'];
  roomQuantity: TOffer['roomQuantity'];
  guestQuantity: TOffer['guestQuantity'];
  rentCost: TOffer['rentCost'];
  comforts: TOffer['comforts'];
  userId: string;
}
