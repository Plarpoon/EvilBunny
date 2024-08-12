import { Command } from '@sapphire/framework';
import { ChatInputCommandInteraction } from 'discord.js';

export class PingCommand extends Command {
    public constructor(context: Command.LoaderContext, options: Command.Options) {
        super(context, {
            ...options,
            name: 'ping',
            description: 'Replies with the bot\'s ping!',
        });
    }

    public override async chatInputRun(interaction: ChatInputCommandInteraction) {
        const msg = await interaction.reply({ content: 'Pinging...', fetchReply: true });
        const latency = msg.createdTimestamp - interaction.createdTimestamp;
        await interaction.editReply(`Pong! Latency: ${latency}ms, API Latency: ${Math.round(this.container.client.ws.ping)}ms`);
    }
}