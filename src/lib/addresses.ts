export const DEFAULT_CHAIN_ID = 50312 as const;

export const ADDRESSES = {
  50312: {
    WNSRegistry: "0xbcBC65828Afea72b83C8a07666226d3319739b62",
    WalletImplementation: "0x269ca8D0fB38Fe18435B2AC70911487ED340B2F3",
    WalletFactory: "0x440Df1c316041B15F08298Da6c267B38Dcd3aE7c",
    RecoveryManager: "0x52d50D41FABB1A2C3434cA79d9a3963D9140C7De",
  },
  503121: {
    // TODO: fill with mainnet addresses when deployed
    WNSRegistry: "0x0000000000000000000000000000000000000000",
    WalletImplementation: "0x0000000000000000000000000000000000000000",
    WalletFactory: "0x0000000000000000000000000000000000000000",
    RecoveryManager: "0x0000000000000000000000000000000000000000",
  },
} as const;


import WalletFactoryABI from "./abi/WalletFactory.json";
import WalletImplementationABI from "./abi/WalletImplementation.json";
import WNSRegistryABI from "./abi/WNSRegistry.json";
import RecoveryManagerABI from "./abi/RecoveryManager.json";

// Get current chain addresses (default to testnet)
const currentAddresses = ADDRESSES[50312];

export const contracts = {
  walletFactory: {
    address: currentAddresses.WalletFactory,
    abi: WalletFactoryABI,
  },
  walletImplementation: {
    address: currentAddresses.WalletImplementation,
    abi: WalletImplementationABI,
  },
  wnsRegistry: {
    address: currentAddresses.WNSRegistry,
    abi: WNSRegistryABI,
  },
  recoveryManager: {
    address: currentAddresses.RecoveryManager,
    abi: RecoveryManagerABI,
  },
};