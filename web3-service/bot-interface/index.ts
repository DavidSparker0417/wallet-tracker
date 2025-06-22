import { config } from "../config";
import { wsClient } from "../websocket/websocket";

export async function botSendMessage(type: string, message: string) {
  if (wsClient.isConnected()) {
    wsClient.send({
      type: type,
      message: message
    });
  }
}