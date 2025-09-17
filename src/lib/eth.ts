import { createPublicClient, createWalletClient, http, getAddress, defineChain, custom } from "viem";
import { ADDRESSES, DEFAULT_CHAIN_ID } from "./addresses";
import walletImplAbi from "./abi/WalletImplementation.json";
import factoryAbi from "./abi/WalletFactory.json";
import registryAbi from "./abi/WNSRegistry.json";
import recoveryAbi from "./abi/RecoveryManager.json";

export const SomniaTestnet = defineChain({
  id: 50312,
  name: "Somnia Testnet",
  nativeCurrency: { name: "STT", symbol: "STT", decimals: 18 },
  rpcUrls: { default: { http: ["https://dream-rpc.somnia.network"] }, public: { http: ["https://dream-rpc.somnia.network"] } },
  blockExplorers: { default: { name: "Somnia Explorer", url: "https://shannon-explorer.somnia.network/" } },
});

export const Somnia = defineChain({
  id: 503121,
  name: "Somnia Mainnet",
  nativeCurrency: { name: "STT", symbol: "STT", decimals: 18 },
  rpcUrls: { default: { http: ["https://dream-rpc.somnia.network"] }, public: { http: ["https://rpc.somnia.com"] } },
  blockExplorers: { default: { name: "W Scan", url: "https://shannon-explorer.somnia.network/" } },
});

const CHAIN_MAP = {
  50312: SomniaTestnet,
  503121: Somnia,
} as const;

const activeChainId = (typeof window !== "undefined" && (window as any).__W_CHAIN_ID__) || DEFAULT_CHAIN_ID || 50312;
export const activeChain = CHAIN_MAP[activeChainId as 50312 | 503121] ?? SomniaTestnet;

export const publicClient = createPublicClient({
  chain: activeChain,
  transport: http(activeChain.rpcUrls.default.http[0]),
});

export const walletClient = typeof window !== "undefined" && (window as any).ethereum
  ? createWalletClient({ chain: activeChain, transport: custom((window as any).ethereum) })
  : undefined;

const addresses = ADDRESSES[activeChainId as keyof typeof ADDRESSES];

export const contracts = {
  walletImplementation: { address: getAddress(addresses.WalletImplementation), abi: walletImplAbi as any },
  walletFactory: { address: getAddress(addresses.WalletFactory), abi: factoryAbi as any },
  wnsRegistry: { address: getAddress(addresses.WNSRegistry), abi: registryAbi as any },
  recoveryManager: { address: getAddress(addresses.RecoveryManager), abi: recoveryAbi as any },
} as const;
