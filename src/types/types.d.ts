import '@sapphire/framework';

declare module '@sapphire/framework' {
  interface Container {
    guildIds: string[];
  }
}
