import type { Command } from './command.interface.js';

export class HelpCommand implements Command {
  getName(): string {
    return '--help';
  }

  async execute(..._parameters: string[]): Promise<void> {
    console.info(`
        Программа для подготовки данных для REST API сервера.
        Пример:
            cli.js --<command> [--arguments]
        Команды:
            --help:                      # печатает этот текст
            --version:                   # выводит номер версии
            --import <path>:             # импортирует данные из TSV
    `);
  }
}
