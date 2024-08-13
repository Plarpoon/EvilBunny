import { SapphireClient } from '@sapphire/framework';
import { GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import { getAllGuildIds } from '../src/utils/guildUtils';
import { customContainer } from '../src/CustomContainer';

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
    expect(customContainer.guildIds).toEqual(['123', '456']);
  });

  test('Bot should handle login failure gracefully', async () => {
    const loginSpy = jest
      .spyOn(client, 'login')
      .mockRejectedValue(new Error('Login failed'));
    await expect(client.login(process.env.DISCORD_TOKEN)).rejects.toThrow(
      'Login failed',
    );
    loginSpy.mockRestore();
  });
});
