# Karolo Bot

A TypeScript project with two services: a Telegram bot service and a Web3 service for Solana interactions.

## Project Structure

- `bot-service/`: Telegram bot implementation
- `web3-service/`: Solana blockchain interactions and PumpFun detection

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file with your configuration:
- `TELEGRAM_TOKEN`: Your Telegram bot token (get it from @BotFather)
- `SOLANA_RPC_URL`: Solana RPC endpoint (defaults to mainnet-beta)
- `BOT_PORT`: Port for bot service WebSocket server (default: 3000)

## Development

### Running the Services

```bash
# Run bot service in development mode
npm run dev:bot

# Run web3 service in development mode
npm run dev:web3
```

### Building the Project

```bash
# Build all services
npm run build

# Build specific service
npm run build:bot
npm run build:web3
```

### Production Mode
```bash
# Run bot service
npm run start:bot

# Run web3 service
npm run start:web3
```

## Bot Commands

### Available Commands
- `/ping` - Test if the bot is responding
- `/subscribe` - Subscribe to PumpFun mint notifications
- `/unsubscribe` - Unsubscribe from PumpFun mint notifications

## Features

### Bot Service
- Telegram bot integration
- WebSocket server for receiving detections
- Notification subscription system
- Basic command handling

### Web3 Service
- Solana blockchain connection
- PumpFun mint detection
- WebSocket client for sending detections
- Real-time monitoring

## TypeScript

This project uses TypeScript for type safety and better development experience. The configuration is in `tsconfig.json`. 