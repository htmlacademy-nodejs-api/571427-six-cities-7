import type { Comfort, Housing, City } from '../enums/index.js';

export type TMockServerData = {
  titles: string[];
  descriptions: string[];
  cities: City[];
  previews: string[];
  photoes: string[];
  housings: Housing[];
  comforts: Comfort[];
  names: string[];
  emails: string[];
  avatars: string[];
  passwords: string[];
};
