import chalk from 'chalk';

import type { Command } from './command.interface.js';

export class HelpCommand implements Command {
  getName(): string {
    return '--help';
  }

  async execute(..._parameters: string[]): Promise<void> {
    console.info(`
        ${chalk.yellow('Программа для подготовки данных для REST API сервера.')}
        Пример:
            ${chalk.blue('cli.js --<command> [--arguments]')}
        Команды:
            ${chalk.green('--help:                      # печатает этот текст')}
            ${chalk.magenta(
              '--version:                   # выводит номер версии'
            )}
            ${chalk.cyan(
              '--import <path>:             # импортирует данные из TSV'
            )}
    `);
  }
}
