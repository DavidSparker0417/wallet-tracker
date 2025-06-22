import WebSocket from 'ws';
import { config } from '../config';

export class WebSocketClient {
    private ws: WebSocket | null = null;
    private reconnectAttempts = 0;
    private maxReconnectAttempts = 5;
    private reconnectDelay = 5000; // 5 seconds

    constructor() {
        this.connect();
    }

    private connect() {
        try {
            this.ws = new WebSocket(config.websocket.botServiceUrl);
            this.setupEventHandlers();
        } catch (error) {
            console.error('Failed to connect to WebSocket server:', error);
            this.scheduleReconnect();
        }
    }

    private setupEventHandlers() {
        if (!this.ws) return;

        this.ws.on('open', () => {
            console.log('Connected to bot service WebSocket server');
            this.reconnectAttempts = 0; // Reset reconnect attempts on successful connection
        });

        this.ws.on('message', (data: WebSocket.Data) => {
            try {
                const message = JSON.parse(data.toString());
                console.log('Received message from bot service:', message);
            } catch (error) {
                console.error('Error parsing WebSocket message:', error);
            }
        });

        this.ws.on('error', (error) => {
            // console.error('WebSocket error:', error);
        });

        this.ws.on('close', (code: number, reason: Buffer) => {
            console.log(`WebSocket connection closed: ${code} - ${reason.toString()}`);
            this.scheduleReconnect();
        });
    }

    private scheduleReconnect() {
        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
            console.error('Max reconnection attempts reached. Stopping reconnection attempts.');
            return;
        }

        this.reconnectAttempts++;
        console.log(`Scheduling reconnection attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts} in ${this.reconnectDelay}ms`);
        
        setTimeout(() => {
            console.log('Attempting to reconnect...');
            this.connect();
        }, this.reconnectDelay);
    }

    public send(message: any): boolean {
        if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
            console.warn('WebSocket is not connected. Message not sent:', message);
            return false;
        }

        try {
            this.ws.send(JSON.stringify(message));
            return true;
        } catch (error) {
            console.error('Error sending WebSocket message:', error);
            return false;
        }
    }

    public isConnected(): boolean {
        return this.ws !== null && this.ws.readyState === WebSocket.OPEN;
    }

    public close() {
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
    }
}

// Export a singleton instance
export const wsClient = new WebSocketClient(); 