import {
  defaultClasses,
  getModelForClass,
  modelOptions,
  prop
} from '@typegoose/typegoose';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface ComfortEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'comforts',
    timestamps: true
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class ComfortEntity extends defaultClasses.TimeStamps {
  @prop({ required: true, trim: true, unique: true })
  public name: string;
}

export const ComfortModel = getModelForClass(ComfortEntity);
