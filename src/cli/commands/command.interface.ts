export interface ICommand {
  getName(): string;
  execute(...params: string[]): void;
}
