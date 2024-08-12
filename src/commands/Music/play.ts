import { Command, ApplicationCommandRegistry } from '@sapphire/framework';
import { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } from '@discordjs/voice';
import { ChatInputCommandInteraction, ApplicationCommandOptionType, GuildMember, VoiceChannel } from 'discord.js';
import ytdl from 'ytdl-core';

export class PlayCommand extends Command {
    public constructor(context: Command.LoaderContext, options: Command.Options) {
        super(context, {
            ...options,
            name: 'play',
            description: 'Plays a YouTube video in your voice channel',
        });
    }

    public override async chatInputRun(interaction: ChatInputCommandInteraction) {
        const url = interaction.options.getString('url', true);
        const member = interaction.member as GuildMember;
        const channel = member.voice.channel as VoiceChannel;

        if (!channel) {
            return interaction.reply('You need to be in a voice channel to use this command.');
        }

        const connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
        });

        const stream = ytdl(url, { filter: 'audioonly' });
        const player = createAudioPlayer();
        const resource = createAudioResource(stream);

        player.play(resource);
        connection.subscribe(player);

        player.on(AudioPlayerStatus.Playing, () => {
            interaction.reply('Now playing!');
        });

        player.on(AudioPlayerStatus.Idle, () => {
            connection.destroy();
        });
    }

    public override registerApplicationCommands(registry: ApplicationCommandRegistry) {
        registry.registerChatInputCommand({
            name: this.name,
            description: this.description,
            options: [
                {
                    name: 'url',
                    description: 'YouTube URL',
                    type: ApplicationCommandOptionType.String,
                    required: true,
                },
            ],
        });
    }
}
