import { Command } from '@sapphire/framework'; // Removed Listener import
import { Message } from 'discord.js';
import { CommandListener } from '../../src/listeners/commandListener';
import { customContainer } from '../../src/CustomContainer';

describe('Command Listener', () => {
  let listener: CommandListener;

  beforeAll(() => {
    listener = new CommandListener(
      {
        container: customContainer,
      } as any,
      {},
    );
  });

  test('commandRun event should log command execution', () => {
    const command = { name: 'testCommand' } as Command;
    const message = { author: { tag: 'TestUser' } } as Message;

    listener.run(message, command);

    expect(customContainer.logger.info).toHaveBeenCalledWith(
      'Command testCommand executed by TestUser',
    );
  });
});
