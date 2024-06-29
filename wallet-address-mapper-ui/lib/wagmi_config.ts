import { createConfig, http } from 'wagmi'
import { baseSepolia } from 'wagmi/chains'
import { coinbaseWallet, metaMask } from 'wagmi/connectors'

export const config = createConfig({
  chains: [baseSepolia],
  connectors: [coinbaseWallet({
    appName: "Wallet Address  Mapper",
    preference: "smartWalletOnly"
  }), metaMask({
    dappMetadata: {
      name: "Wallet Address Mapper"
    }
  })],
  transports: {
    [baseSepolia.id]: http(),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config;
  }
}
