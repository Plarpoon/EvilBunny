import { Command, Listener } from '@sapphire/framework';
import { Message } from 'discord.js';
import { CommandListener } from '../../src/listeners/commandListener';

describe('Command Listener', () => {
  let listener: CommandListener;

  beforeAll(() => {
    listener = new CommandListener(
      {
        container: {
          logger: {
            info: jest.fn(),
          },
        },
      } as any,
      {},
    );
  });

  test('commandRun event should log command execution', () => {
    const command = { name: 'testCommand' } as Command;
    const message = { author: { tag: 'TestUser' } } as Message;

    listener.run(message, command);

    expect(listener.container.logger.info).toHaveBeenCalledWith(
      'Command testCommand executed by TestUser',
    );
  });
});
