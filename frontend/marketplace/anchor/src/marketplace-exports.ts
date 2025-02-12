// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import MarketplaceIDL from '../target/idl/marketplace.json'
import type { Marketplace } from '../target/types/marketplace'

// Re-export the generated IDL and type
export { Marketplace, MarketplaceIDL }

// The programId is imported from the program IDL.
export const MARKETPLACE_PROGRAM_ID = new PublicKey(MarketplaceIDL.address)

// This is a helper function to get the Marketplace Anchor program.
export function getMarketplaceProgram(provider: AnchorProvider, address?: PublicKey) {
  return new Program({ ...MarketplaceIDL, address: address ? address.toBase58() : MarketplaceIDL.address } as Marketplace, provider)
}

// This is a helper function to get the program ID for the Marketplace program depending on the cluster.
export function getMarketplaceProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the Marketplace program on devnet and testnet.
      return new PublicKey('86pLXiqvd8h51GLDsd9FCGJ5DLxuJZcSYarq2MRWPp6W')
    case 'mainnet-beta':
    default:
      return MARKETPLACE_PROGRAM_ID
  }
}
