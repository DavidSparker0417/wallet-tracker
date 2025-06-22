import { config as dotenvConfig } from 'dotenv';
import { join } from 'path';
dotenvConfig({ path: join(__dirname, '.env') });

export const config = {
    telegram: {
        token: process.env.TELEGRAM_TOKEN || '',
    },
    websocket: {
        port: parseInt(process.env.BOT_WS_PORT || '3000', 10),
    },
} as const;

// Validate required environment variables
if (!config.telegram.token) {
    throw new Error('TELEGRAM_TOKEN is not set in environment variables');
} 