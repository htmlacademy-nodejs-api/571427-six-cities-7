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

export const CreateOfferValidationMessage = {
  title: {
    invalidFormat: 'Field title must be string',
    minLength: `Minimum title length must be ${MIN_TITLE_LENGTH}`,
    maxLength: `Maximum title length must be ${MAX_TITLE_LENGTH}`
  },
  description: {
    invalidFormat: 'Field description must be string',
    minLength: `Minimum description length must be ${MIN_DESCR_LENGTH}`,
    maxLength: `Maximum description length must be ${MAX_DESCR_LENGTH}`
  },
  city: {
    invalid:
      'Field city must be one of: Paris, Cologne, Brussels, Amsterdam, Hamburg, Dusseldorf'
  },
  preview: {
    invalidFormat: 'field preview must be an string'
  },
  photoes: {
    invalidFormat: 'Field photoes must be an array of strings'
  },
  isPremium: {
    invalidFormat: 'Field isPremium must be boolean'
  },
  housing: {
    invalid: 'Field housing must be one of: apartment, house, room, hotel'
  },
  roomQuantity: {
    invalidFormat: 'Field roomQuantity must be integer',
    minValue: `Minimum rooms must be ${MIN_ROOM_QUANTITY}`,
    maxValue: `Maximum rooms must be ${MAX_ROOM_QUANTITY}`
  },
  guestQuantity: {
    invalidFormat: 'Field guestQuantity must be integer',
    minValue: `Minimum guests must be ${MIN_GUEST_QUANTITY}`,
    maxValue: `Maximum guests must be ${MAX_GUEST_QUANTITY}`
  },
  rentCost: {
    invalidFormat: 'Field rentCost must be integer',
    minValue: `Minimum rent cost must be ${MIN_PRICE}`,
    maxValue: `Maximum rent const must be ${MAX_PRICE}`
  },
  comforts: {
    invalidFormat: 'Field comforts must be an array of strings'
  }
} as const;
