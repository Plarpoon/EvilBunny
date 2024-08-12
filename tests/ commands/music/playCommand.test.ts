import { PlayCommand } from '../src/commands/play';
import {
  ChatInputCommandInteraction,
  GuildMember,
  VoiceChannel,
} from 'discord.js';

jest.mock('@discordjs/voice', () => ({
  joinVoiceChannel: jest.fn(),
  createAudioPlayer: jest.fn().mockReturnValue({
    play: jest.fn(),
    on: jest.fn(),
  }),
  createAudioResource: jest.fn(),
  AudioPlayerStatus: {
    Playing: 'playing',
    Idle: 'idle',
  },
}));

describe('Play Command', () => {
  let playCommand: PlayCommand;
  let interaction: ChatInputCommandInteraction;

  beforeEach(() => {
    playCommand = new PlayCommand(
      {
        container: {
          logger: { info: jest.fn() },
          guildIds: ['123'],
        },
      } as any,
      {},
    );

    interaction = {
      options: {
        getString: jest
          .fn()
          .mockReturnValue('https://www.youtube.com/watch?v=dQw4w9WgXcQ'),
      },
      member: {
        voice: {
          channel: {
            id: 'voiceChannelId',
            guild: { id: 'guildId', voiceAdapterCreator: {} },
          },
        },
      },
      reply: jest.fn(),
    } as any;
  });

  test('should join voice channel and play audio', async () => {
    await playCommand.chatInputRun(interaction);

    expect(interaction.reply).toHaveBeenCalledWith('Now playing!');
  });

  test('should reject if user is not in a voice channel', async () => {
    interaction.member.voice.channel = null;
    await playCommand.chatInputRun(interaction);

    expect(interaction.reply).toHaveBeenCalledWith(
      'You need to be in a voice channel to use this command.',
    );
  });
});
