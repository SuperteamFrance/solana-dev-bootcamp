// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import CounterdappIDL from '../target/idl/counter.json'
import type { Counter } from '../target/types/counter'

// Re-export the generated IDL and type
export { Counter, CounterdappIDL }

// The programId is imported from the program IDL.
export const COUNTERDAPP_PROGRAM_ID = new PublicKey(CounterdappIDL.address)

// This is a helper function to get the Counterdapp Anchor program.
export function getCounterdappProgram(provider: AnchorProvider, address?: PublicKey) {
  return new Program({ ...CounterdappIDL, address: address ? address.toBase58() : CounterdappIDL.address } as Counter, provider)
}

// This is a helper function to get the program ID for the Counterdapp program depending on the cluster.
export function getCounterdappProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the Counterdapp program on devnet and testnet.
      return new PublicKey('EFiNutCg61xZtpWd2LtZvn93yKDinVwKZQE4vAD1frYz')
    case 'mainnet-beta':
    default:
      return COUNTERDAPP_PROGRAM_ID
  }
}
