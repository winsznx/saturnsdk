import { StacksMainnet, StacksTestnet, StacksDevnet, StacksNetwork } from "@stacks/network";
import { SaturnConfig, NetworkType } from "./types";
import { SATURN_CORE_ADDRESSES, DEFAULT_NETWORK } from "./constants";

export class SaturnClient {
  public network: StacksNetwork;
  public coreAddress: string;

  constructor(config: SaturnConfig = { network: DEFAULT_NETWORK }) {
    this.coreAddress = config.coreAddress || SATURN_CORE_ADDRESSES[config.network];
    
    switch (config.network) {
      case "mainnet":
        this.network = new StacksMainnet();
        break;
      case "testnet":
        this.network = new StacksTestnet();
        break;
      case "devnet":
        this.network = new StacksDevnet();
        break;
      default:
        this.network = new StacksMainnet();
    }
  }

  // Modules will be initialized here
  // get vault() { return new VaultModule(this); }
}
