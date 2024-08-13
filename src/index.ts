import { LogLevel, SapphireClient } from '@sapphire/framework';
import { GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import { getAllGuildIds } from './utils/guildUtils';
import { customContainer } from './CustomContainer';

// Load environment variables from the .env file
dotenv.config();

const client = new SapphireClient({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
  logger: {
    level: LogLevel.Debug,
  },
});

client.once('ready', async () => {
  client.logger.info(`Logged in as ${client.user?.tag}!`);
  client.logger.info('Ready and listening for commands...');

  // Scan for all guild IDs and store them in the client container
  const guildIds = await getAllGuildIds(client);

  customContainer.guildIds = guildIds;

  client.logger.info(`Found and registered ${guildIds.length} guilds.`);
});

client.login(process.env.DISCORD_TOKEN).catch((error) => {
  client.logger.error('Failed to login:', error);
});
