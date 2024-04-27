import chalk from 'chalk';

import type { ICommand } from './command.interface.js';

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
            ${chalk.red('--help')}:                      # ${chalk.cyan('печатает этот текст')}
            ${chalk.red('--version')}:                   # ${chalk.cyan('выводит номер версии')}
            ${chalk.red('--import <path>')}:             # ${chalk.cyan('импортирует данные из TSV')}
            ${chalk.red('--generate <count> <path>')}:   # ${chalk.cyan('гененирует данные в TSV')}
    `);
  }
}
