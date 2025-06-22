import { botSendMessage } from "../bot-interface";
import { settings } from "../config";

export function walletTrackerHandler(data:any) {
  if (!data)
    return;

  if (data.type !== 'SolTransfer')
    return

  console.log(data);
  const who = data.from;
  const tracking = settings.tracking.find((t:any) => t.wallet === who);
  if (!tracking)
    return;

  const to = data.to
  const range = tracking.range;
  const amount = data.amount;
  if (amount >= range[0] && amount <= range[1]) {
    botSendMessage('wallet_transfer', `💰 Wallet Transfer Detected!
📝 From: <code>${who}</code>
👀 To: <code>${to}</code>
💰 Amount: ${amount.toFixed(5)} SOL
🔗 Signature: <code>${data.signature}</code>
⏰ Time: ${new Date().toISOString()}`);
  }
}