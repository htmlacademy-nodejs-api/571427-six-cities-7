import chalk from 'chalk';

import type { ICommand } from './command.interface.js';

const COMMANDS = {
  HELP: '--help:                      # печатает этот текст',
  VERSION: '--version:                   # выводит номер версии',
  IMPORT: '--import <path>:             # импортирует данные из TSV'
};

export class HelpCommand implements ICommand {
  getName(): string {
    return '--help';
  }

  async execute(..._parameters: string[]): Promise<void> {
    console.info(`
        ${chalk.yellow('Программа для подготовки данных для REST API сервера.')}
        Пример:
            ${chalk.blue('cli.js --<command> [--arguments]')}
        Команды:
            ${chalk.green(COMMANDS.HELP)}
            ${chalk.magenta(COMMANDS.VERSION)}
            ${chalk.cyan(COMMANDS.IMPORT)}
    `);
  }
}
