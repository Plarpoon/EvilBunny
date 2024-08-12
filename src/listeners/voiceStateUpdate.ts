import { Listener } from '@sapphire/framework';
import { VoiceState } from 'discord.js';

export class VoiceStateUpdateListener extends Listener {
  public constructor(
    context: Listener.LoaderContext,
    options: Listener.Options,
  ) {
    super(context, {
      ...options,
      event: 'voiceStateUpdate',
    });
  }

  public run(oldState: VoiceState, newState: VoiceState) {
    const channel = newState.guild.channels.cache.get('your-log-channel-id');

    if (!channel?.isTextBased()) return;

    if (oldState.channelId === newState.channelId) return;

    if (!oldState.channelId && newState.channelId) {
      channel.send(
        `${newState.member?.user.tag} joined ${newState.channel?.name}`,
      );
    } else if (oldState.channelId && !newState.channelId) {
      channel.send(
        `${newState.member?.user.tag} left ${oldState.channel?.name}`,
      );
    } else if (oldState.channelId && newState.channelId) {
      channel.send(
        `${newState.member?.user.tag} moved from ${oldState.channel?.name} to ${newState.channel?.name}`,
      );
    }
  }
}
