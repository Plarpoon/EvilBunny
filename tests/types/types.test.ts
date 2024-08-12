import { container } from '@sapphire/framework';

describe('Container Interface', () => {
  test('container should have guildIds property', () => {
    container.guildIds = ['123', '456'];
    expect(container.guildIds).toEqual(expect.arrayContaining(['123', '456']));
  });
});
