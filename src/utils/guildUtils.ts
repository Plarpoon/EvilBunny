import { SapphireClient } from '@sapphire/framework';
import { Guild } from 'discord.js';

// Function to get all guild IDs the bot is connected to
export async function getAllGuildIds(
  client: SapphireClient,
): Promise<string[]> {
  const guilds = await client.guilds.fetch();

  // Fetch full guild objects
  const fullGuilds = await Promise.all(
    guilds.map((partialGuild) => partialGuild.fetch()),
  );

  return fullGuilds.map((guild: Guild) => guild.id);
}
