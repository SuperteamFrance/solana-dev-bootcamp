'use client'
import * as anchor from "@coral-xyz/anchor";
import { getMarketplaceProgram, getMarketplaceProgramId } from '@project/anchor'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { Connection, Keypair, PublicKey, Transaction, sendAndConfirmTransaction, Cluster, SystemProgram } from '@solana/web3.js';
import { getAssociatedTokenAddress, createTransferInstruction } from '@solana/spl-token';
import { useMutation, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import toast from 'react-hot-toast'
import { useCluster } from '../cluster/cluster-data-access'
import { useAnchorProvider } from '../solana/solana-provider'
import { useTransactionToast } from '../ui/ui-layout'

export function useMarketplaceProgram() {
  const { connection } = useConnection()
  const { cluster } = useCluster()
  const wallet = useWallet()
  const transactionToast = useTransactionToast()
  const provider = useAnchorProvider()
  const programId = useMemo(() => getMarketplaceProgramId(cluster.network as Cluster), [cluster])
  const program = useMemo(() => getMarketplaceProgram(provider, programId), [provider, programId])

  const accounts = useQuery({
    queryKey: ['marketplace', 'all', { cluster }],
    queryFn: () => program.account.escrowAccount.all(),
  })

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  })

  const initialize = useMutation({
    mutationKey: ['marketplace', 'initialize', { cluster }],
    mutationFn: async ({ makerAmount, takerAmount, takerTokenMint }: { 
      makerAmount: number; 
      takerAmount: number; 
      takerTokenMint: PublicKey; 
    }) => {
      // TODO
      if(!wallet.publicKey) return;

      const [escrowPda, escrowBump] = await anchor.web3.PublicKey.findProgramAddress(
        [Buffer.from("escrow"), wallet.publicKey.toBuffer()],
        program.programId
      );
  
      await program.methods
        .initializeEscrow(new anchor.BN(makerAmount), new anchor.BN(takerAmount), takerTokenMint)
        .accounts({
          escrowAccount: escrowPda,
          maker: wallet.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .rpc();
    },
    onSuccess: (signature: any) => {
      transactionToast(signature)
      return accounts.refetch()
    },
    onError: () => toast.error('Failed to initialize account'),
  })

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    initialize,
  }
}

export function useMarketplaceProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const { program, accounts } = useMarketplaceProgram()
  const wallet = useWallet()
  const { connection } = useConnection()

  const accountQuery = useQuery({
    queryKey: ['marketplace', 'fetch', { cluster, account }],
    queryFn: () => program.account.escrowAccount.fetch(account),
  })

  const acceptEscrow = useMutation({
    mutationKey: ['marketplace', 'accept', { cluster, account }],
    mutationFn: async () => {
      // TODO
      console.log("test1");
      if(!wallet.publicKey) return;
      console.log("test2");

      const maker = accountQuery.data?.maker;
      const tokenAddress = accountQuery.data?.takerTokenMint;

      const takerTokenAccount = await getAssociatedTokenAddress(tokenAddress, wallet.publicKey, false)
      const makerTokenAccount = await getAssociatedTokenAddress(tokenAddress, maker, false)

      return await program.methods.acceptEscrow().accounts({
        escrowAccount: account,
        taker: wallet.publicKey,
        maker: maker,
        takerTokenAccount: takerTokenAccount,
        makerTokenAccount: makerTokenAccount,
        takerTokenMint: tokenAddress,
        tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
        associatedTokenProgram: anchor.utils.token.ASSOCIATED_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
      }).rpc();
    },
    onSuccess: (tx: any) => {
      transactionToast(tx)
      return accounts.refetch()
    },
  })

  return {
    accountQuery,
    acceptEscrow,
  }
}
