import { CommandParser } from './command-parser.js';

import type { ICommand } from './commands/command.interface.js';

type TCommandCollection = Record<string, ICommand>;

export class CLIApplication {
  private commands: TCommandCollection = {};

  constructor(private readonly defaultCommand: string = '--help') {}

  registerCommands(commandList: ICommand[]): void {
    commandList.forEach((command) => {
      if (Object.hasOwn(this.commands, command.getName())) {
        throw new Error(`Command ${command.getName()} is already registered`);
      }
      this.commands[command.getName()] = command;
    });
  }

  getCommand(commandName: string): ICommand {
    return this.commands[commandName] ?? this.getDefaultCommand();
  }

  getDefaultCommand(): ICommand | never {
    if (!this.commands[this.defaultCommand]) {
      throw new Error(
        `The default command (${this.defaultCommand}) is not registered.`
      );
    }
    return this.commands[this.defaultCommand];
  }

  processCommand(argv: string[]): void {
    const parsedCommand = CommandParser.parse(argv);
    const [commandName] = Object.keys(parsedCommand);
    const command = this.getCommand(commandName);
    const commandArguments = parsedCommand[commandName] ?? [];

    command.execute(...commandArguments);
  }
}
