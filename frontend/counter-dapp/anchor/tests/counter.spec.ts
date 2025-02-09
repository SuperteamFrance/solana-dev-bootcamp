import * as anchor from '@coral-xyz/anchor'
import {Program} from '@coral-xyz/anchor'
import {Keypair} from '@solana/web3.js'
import {Counterdapp} from '../target/types/counter'

describe('counter', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const payer = provider.wallet as anchor.Wallet

  const program = anchor.workspace.Counterdapp as Program<Counterdapp>

  const counterKeypair = Keypair.generate()

  it('Initialize Counterdapp', async () => {
    await program.methods
      .initialize()
      .accounts({
        counter: counterKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([counterKeypair])
      .rpc()

    const currentCount = await program.account.counter.fetch(counterKeypair.publicKey)

    expect(currentCount.count).toEqual(0)
  })

  it('Increment Counterdapp', async () => {
    await program.methods.increment().accounts({ counter: counterKeypair.publicKey }).rpc()

    const currentCount = await program.account.counter.fetch(counterKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Increment Counterdapp Again', async () => {
    await program.methods.increment().accounts({ counter: counterKeypair.publicKey }).rpc()

    const currentCount = await program.account.counter.fetch(counterKeypair.publicKey)

    expect(currentCount.count).toEqual(2)
  })

  it('Decrement Counterdapp', async () => {
    await program.methods.decrement().accounts({ counter: counterKeypair.publicKey }).rpc()

    const currentCount = await program.account.counter.fetch(counterKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Set counter value', async () => {
    await program.methods.set(42).accounts({ counter: counterKeypair.publicKey }).rpc()

    const currentCount = await program.account.counter.fetch(counterKeypair.publicKey)

    expect(currentCount.count).toEqual(42)
  })

  it('Set close the counter account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        counter: counterKeypair.publicKey,
      })
      .rpc()

    // The account should no longer exist, returning null.
    const userAccount = await program.account.counter.fetchNullable(counterKeypair.publicKey)
    expect(userAccount).toBeNull()
  })
})
