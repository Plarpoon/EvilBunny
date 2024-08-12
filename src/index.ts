import { LogLevel, SapphireClient } from '@sapphire/framework';
import { GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

const client = new SapphireClient({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates
    ],
    logger: {
        level: LogLevel.Debug
    }
});

// Use the token from the environment variables
client.login(process.env.DISCORD_TOKEN).catch(console.error);
