import { config } from 'dotenv';
import { join } from 'path';
config({ path: join(__dirname, '.env') });

// Import other modules after environment variables are loaded
import { config as botConfig } from './config';
import TelegramBot, { Message } from 'node-telegram-bot-api';
import { WebSocketServer } from './websocket';

// Initialize Telegram bot
const bot = new TelegramBot(botConfig.telegram.token, { polling: true });

// Initialize WebSocket server
const wsServer = new WebSocketServer(bot);

// Telegram bot events
bot.on('message', async (msg: Message) => {
    const chatId = msg.chat.id;
    const text = msg.text || '';

    if (text.startsWith('/ping')) {
        await bot.sendMessage(chatId, 'Pong!');
    } else if (text.startsWith('/subscribe')) {
        wsServer.subscribe(chatId.toString());
        await bot.sendMessage(chatId, '✅ Subscribed to notifications!');
    } else if (text.startsWith('/unsubscribe')) {
        wsServer.unsubscribe(chatId.toString());
        await bot.sendMessage(chatId, '❌ Unsubscribed from notifications.');
    }
});

// Verify Telegram token
const telegramToken: string = process.env.TELEGRAM_TOKEN || '';
if (!telegramToken) {
    console.error('TELEGRAM_TOKEN is not set in environment variables');
    process.exit(1);
}

async function main() {
  console.log('Bot service starting...');
  console.log('WebSocket port:', botConfig.websocket.port);
}

main()