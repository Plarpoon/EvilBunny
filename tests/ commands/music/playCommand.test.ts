import { PlayCommand } from '../../../src/commands/Music/play';
import {
  ChatInputCommandInteraction,
  GuildMember,
  VoiceChannel,
} from 'discord.js';
import { customContainer } from '../../../src/CustomContainer';
import ytdl from 'ytdl-core';

jest.mock('ytdl-core');
const mockedYtdl = ytdl as jest.MockedFunction<typeof ytdl>;

describe('Play Command', () => {
  let command: PlayCommand;
  let interaction: ChatInputCommandInteraction;

  beforeAll(() => {
    command = new PlayCommand(
      {
        container: customContainer,
      } as any,
      {},
    );
  });

  beforeEach(() => {
    interaction = {
      reply: jest.fn(),
      options: {
        getString: jest
          .fn()
          .mockReturnValue('https://www.youtube.com/watch?v=dQw4w9WgXcQ'),
      },
      member: {
        voice: {
          channel: {
            id: 'voice-channel-id',
            guild: {
              id: 'guild-id',
              voiceAdapterCreator: {},
            },
          } as VoiceChannel,
        },
      } as GuildMember,
    } as unknown as ChatInputCommandInteraction;
  });

  test('should play a YouTube video in a voice channel', async () => {
    mockedYtdl.mockReturnValue('mocked-stream' as any);

    await command.chatInputRun(interaction);

    expect(interaction.reply).toHaveBeenCalledWith('Now playing!');
  });

  test('should return an error if the user is not in a voice channel', async () => {
    if (interaction.member && interaction.member instanceof GuildMember) {
      // Override the read-only channel property for testing purposes
      Object.defineProperty(interaction.member.voice, 'channel', {
        value: null,
      });
    }

    await command.chatInputRun(interaction);

    expect(interaction.reply).toHaveBeenCalledWith(
      'You need to be in a voice channel to use this command.',
    );
  });
});
