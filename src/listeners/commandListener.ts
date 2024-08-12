import { Command, Listener } from '@sapphire/framework';
import { Message } from 'discord.js';

export class CommandListener extends Listener {
    public constructor(context: Listener.LoaderContext, options: Listener.Options) {
        super(context, {
            ...options,
            event: 'commandRun',
        });
    }

    public run(message: Message, command: Command) {
        this.container.logger.info(`Command ${command.name} executed by ${message.author.tag}`);
    }
}

export class CommandErrorListener extends Listener {
    public constructor(context: Listener.LoaderContext, options: Listener.Options) {
        super(context, {
            ...options,
            event: 'commandError',
        });
    }

    public run(error: unknown, { command }: { command: Command }) {
        this.container.logger.error(`Error in command ${command.name}:`, error);
    }
}
