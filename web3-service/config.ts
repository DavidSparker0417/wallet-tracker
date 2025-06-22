import { config as dotenvConfig } from 'dotenv';
import { readFileSync } from 'fs';
import { join } from 'path';

dotenvConfig({ path: join(__dirname, '.env') });
export interface Settings {
    tracking: {
        wallet: string;
        range: number[];
    }[]
}

export let settings: Settings;
export const config = {
    websocket: {
        botServiceUrl: `ws://localhost:${process.env.BOT_WS_PORT || '3000'}`,
        port: parseInt(process.env.WEB3_WS_PORT || '3001', 10),
    },
} as const;

// Validate required environment variables
if (!process.env.BOT_WS_PORT) {
    console.warn('BOT_WS_PORT is not set in environment variables, using default: 3000');
}
if (!process.env.WEB3_WS_PORT) {
    console.warn('WEB3_WS_PORT is not set in environment variables, using default: 3001');
} 

function loadSettings(): Settings {
    const settings = readFileSync(join(__dirname, 'settings.json'), 'utf8');
    return JSON.parse(settings);
}

async function configTask() {
    while (true) {
        settings = loadSettings();
        await new Promise(resolve => setTimeout(resolve, 1000 * 3));
    }
}

configTask();