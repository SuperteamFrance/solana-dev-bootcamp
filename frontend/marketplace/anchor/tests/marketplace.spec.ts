import * as anchor from '@coral-xyz/anchor'
import {Program} from '@coral-xyz/anchor'
import {Keypair} from '@solana/web3.js'
import {Marketplace} from '../target/types/marketplace'

describe('marketplace', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const payer = provider.wallet as anchor.Wallet

  const program = anchor.workspace.Marketplace as Program<Marketplace>

  const marketplaceKeypair = Keypair.generate()

  it('Initialize Marketplace', async () => {
    await program.methods
      .initialize()
      .accounts({
        marketplace: marketplaceKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([marketplaceKeypair])
      .rpc()

    const currentCount = await program.account.marketplace.fetch(marketplaceKeypair.publicKey)

    expect(currentCount.count).toEqual(0)
  })

  it('Increment Marketplace', async () => {
    await program.methods.increment().accounts({ marketplace: marketplaceKeypair.publicKey }).rpc()

    const currentCount = await program.account.marketplace.fetch(marketplaceKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Increment Marketplace Again', async () => {
    await program.methods.increment().accounts({ marketplace: marketplaceKeypair.publicKey }).rpc()

    const currentCount = await program.account.marketplace.fetch(marketplaceKeypair.publicKey)

    expect(currentCount.count).toEqual(2)
  })

  it('Decrement Marketplace', async () => {
    await program.methods.decrement().accounts({ marketplace: marketplaceKeypair.publicKey }).rpc()

    const currentCount = await program.account.marketplace.fetch(marketplaceKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Set marketplace value', async () => {
    await program.methods.set(42).accounts({ marketplace: marketplaceKeypair.publicKey }).rpc()

    const currentCount = await program.account.marketplace.fetch(marketplaceKeypair.publicKey)

    expect(currentCount.count).toEqual(42)
  })

  it('Set close the marketplace account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        marketplace: marketplaceKeypair.publicKey,
      })
      .rpc()

    // The account should no longer exist, returning null.
    const userAccount = await program.account.marketplace.fetchNullable(marketplaceKeypair.publicKey)
    expect(userAccount).toBeNull()
  })
})
