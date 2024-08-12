import { SapphireClient } from '@sapphire/framework';
import { GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import { getAllGuildIds } from '../src/utils/guildUtils';
import { container } from '@sapphire/framework';

dotenv.config();

jest.mock('../src/utils/guildUtils');

describe('Bot Initialization', () => {
  let client: SapphireClient;

  beforeAll(() => {
    client = new SapphireClient({
      intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
    });
  });

  test('Bot should log in and set guildIds', async () => {
    (getAllGuildIds as jest.Mock).mockResolvedValue(['123', '456']);
    await client.login(process.env.DISCORD_TOKEN);
    expect(container.guildIds).toEqual(['123', '456']);
  });
});
