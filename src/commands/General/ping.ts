import {
  Command,
  ApplicationCommandRegistry,
  RegisterBehavior,
} from "@sapphire/framework";
import { ChatInputCommandInteraction } from "discord.js";

export class PingCommand extends Command {
  public constructor(context: Command.LoaderContext, options: Command.Options) {
    super(context, {
      ...options,
      name: "ping",
      description: "Replies with the bot's ping!",
    });
  }

  public override registerApplicationCommands(
    registry: ApplicationCommandRegistry
  ) {
    const guildIds = this.container.guildIds;

    registry.registerChatInputCommand(
      {
        name: this.name,
        description: this.description,
      },
      {
        guildIds,
        behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
      }
    );

    this.container.logger.info(
      `Registered command: ${this.name} for ${guildIds.length} guilds.`
    );
  }

  public override async chatInputRun(interaction: ChatInputCommandInteraction) {
    this.container.logger.info("Ping command received");

    const msg = await interaction.reply({
      content: "Pinging...",
      fetchReply: true,
    });
    const latency = msg.createdTimestamp - interaction.createdTimestamp;
    await interaction.editReply(
      `Pong! Latency: ${latency}ms, API Latency: ${Math.round(
        this.container.client.ws.ping
      )}ms`
    );

    this.container.logger.info("Ping command executed successfully");
  }
}
