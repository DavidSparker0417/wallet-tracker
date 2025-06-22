import { config } from 'dotenv';
import { join } from 'path';
config({ path: join(__dirname, '.env') });

import { solTrGrpcWalletStart } from "dv-sol-lib";
import { settings } from './config';
import { walletTrackerHandler } from './detection/wallet';

async function main() {
  const wallets = settings.tracking.map((t:any) => t.wallet);
  console.log(`tracking wallets: ${wallets}`);
  solTrGrpcWalletStart(wallets, walletTrackerHandler)
}

main()