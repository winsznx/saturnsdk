import { 
  makeContractCall, 
  broadcastTransaction, 
  AnchorMode, 
  FungibleConditionCode,
  makeStandardSTXPostCondition,
  PostConditionMode,
  uintCV
} from "@stacks/transactions";
import { SaturnClient } from "./client";
import { CONTRACT_NAMES } from "./constants";

export class VaultModule {
  constructor(private client: SaturnClient) {}

  public async depositSTX(amount: number, senderAddress: string) {
    const txOptions = {
        contractAddress: this.client.coreAddress,
        contractName: CONTRACT_NAMES.VAULT,
        functionName: "deposit-stx",
        functionArgs: [uintCV(amount)],
        network: this.client.network,
        postConditionMode: PostConditionMode.Deny,
        postConditions: [
            makeStandardSTXPostCondition(senderAddress, FungibleConditionCode.Equal, amount)
        ],
        anchorMode: AnchorMode.Any,
    };

    return await makeContractCall(txOptions);
  }

  public async withdrawSTX(amount: number) {
    const txOptions = {
        contractAddress: this.client.coreAddress,
        contractName: CONTRACT_NAMES.VAULT,
        functionName: "withdraw-stx",
        functionArgs: [uintCV(amount)],
        network: this.client.network,
        postConditionMode: PostConditionMode.Deny,
        anchorMode: AnchorMode.Any,
    };

    return await makeContractCall(txOptions);
  }
  
  // Additional methods for sBTC and safe-withdraw
}
