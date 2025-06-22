import WebSocket from 'ws';
import TelegramBot from 'node-telegram-bot-api';
import { config } from './config';

export class WebSocketServer {
    private wss: WebSocket.Server;
    private notificationChats: Set<string> = new Set();

    constructor(private bot: TelegramBot) {
        this.wss = new WebSocket.Server({ port: config.websocket.port });
        this.setupEventHandlers();
        console.log(`WebSocket server started on port ${config.websocket.port}`);
    }

    private setupEventHandlers() {
        this.wss.on('connection', (ws) => {
            console.log('New WebSocket connection from web3 service');

            ws.on('message', async (data: string) => {
                try {
                    const message = JSON.parse(data);
                    
                    if (message.type === 'wallet_transfer') {
                        // Send Pumpfun mint detection to all subscribed chats
                        for (const chatId of this.notificationChats) {
                            await this.bot.sendMessage(chatId, message.message, { parse_mode: 'HTML' });
                        }
                    }
                } catch (error) {
                    console.error('Error processing WebSocket message:', error);
                }
            });

            ws.on('error', (error) => {
                console.error('WebSocket error:', error);
            });
        });
    }

    public subscribe(chatId: string) {
        this.notificationChats.add(chatId);
    }

    public unsubscribe(chatId: string) {
        this.notificationChats.delete(chatId);
    }

    public isSubscribed(chatId: string): boolean {
        return this.notificationChats.has(chatId);
    }
} 