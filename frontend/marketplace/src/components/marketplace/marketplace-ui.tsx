'use client'

import { useState } from 'react'
import { Keypair, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js'
import { useMemo } from 'react'
import { useMarketplaceProgram, useMarketplaceProgramAccount } from './marketplace-data-access'

const TOKEN_OPTIONS = {
  USDC: "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr",
};

const TOKEN_DECIMALS: Record<string, number> = {
  USDC: 6,
};

export function MarketplaceCreate() {
  const { initialize } = useMarketplaceProgram()

  const [makerAmount, setMakerAmount] = useState("0.1")
  const [takerAmount, setTakerAmount] = useState("50")
  const [selectedToken, setSelectedToken] = useState("USDC")

  const handleSubmit = async () => {
    if (!makerAmount || !takerAmount) return

    await initialize.mutateAsync({
      makerAmount: parseFloat(makerAmount) * LAMPORTS_PER_SOL,
      takerAmount: parseFloat(takerAmount) * 10 ** TOKEN_DECIMALS[selectedToken],
      takerTokenMint: new PublicKey(TOKEN_OPTIONS[selectedToken as keyof typeof TOKEN_OPTIONS])
    });
  }

  return (
    <div className="card bg-base-200 shadow-lg p-6 space-y-4">
      <button onClick={() => window.open('https://spl-token-faucet.com/?token-name=USDC-Dev')}>Get USDC Faucet here</button>
      <h2 className="text-2xl font-bold text-primary">Create a Trade</h2>
      
      <div className="form-control">
        <label className="label">You Offer (SOL)</label>
        <input 
          type="number" 
          className="input input-bordered"
          placeholder="Enter SOL amount"
          value={makerAmount}
          onChange={(e) => setMakerAmount(e.target.value)}
        />
      </div>

      <div className="form-control">
        <label className="label">You Want</label>
        <input 
          type="number" 
          className="input input-bordered"
          placeholder="Enter desired amount"
          value={takerAmount}
          onChange={(e) => setTakerAmount(e.target.value)}
        />
      </div>

      <div className="form-control">
        <label className="label">Select Token</label>
        <select 
          className="select select-bordered"
          value={selectedToken}
          onChange={(e) => setSelectedToken(e.target.value)}
        >
          {Object.keys(TOKEN_OPTIONS).map((token) => (
            <option key={token} value={token}>{token}</option>
          ))}
        </select>
      </div>

      <button 
        className="btn btn-primary w-full mt-4" 
        onClick={handleSubmit}
        disabled={initialize.isPending}
      >
        {initialize.isPending ? "Creating..." : "Create Trade"}
      </button>
    </div>
  )
}

export function MarketplaceList() {
  const { accounts, getProgramAccount } = useMarketplaceProgram()

  if (getProgramAccount.isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>
  }
  if (!getProgramAccount.data?.value) {
    return (
      <div className="alert alert-info flex justify-center">
        <span>Program account not found. Make sure you have deployed the program and are on the correct cluster.</span>
      </div>
    )
  }
  return (
    <div className={'space-y-6'}>
      {accounts.isLoading ? (
        <span className="loading loading-spinner loading-lg"></span>
      ) : accounts.data?.length ? (
        <div className="grid sm:grid-cols-3 gap-4">
          {accounts.data?.map((account) => (
            <MarketplaceCard key={account.publicKey.toString()} account={account.publicKey} />
          ))}
        </div>
      ) : (
        <div className="text-center">
          <h2 className={'text-2xl'}>No accounts</h2>
          No deals found. Create one above to get started.
        </div>
      )}
    </div>
  )
}

function MarketplaceCard({ account }: { account: PublicKey }) {
  const { accountQuery, acceptEscrow } = useMarketplaceProgramAccount({
    account,
  })

  const maker = useMemo(() => accountQuery.data?.maker ?? 0, [accountQuery.data?.maker])
  const makerAmount = useMemo(() => Number(accountQuery.data?.makerAmount) / LAMPORTS_PER_SOL, [accountQuery.data?.makerAmount])
  const takerTokenMint = useMemo(() => accountQuery.data?.takerTokenMint ?? 0, [accountQuery.data?.takerTokenMint])
  const takerTokenSymbol = useMemo(
    () => Object.keys(TOKEN_OPTIONS).find(key => TOKEN_OPTIONS[key as keyof typeof TOKEN_OPTIONS] === takerTokenMint.toString()) || "Unknown",
    [takerTokenMint]
  );
  const takerAmount = useMemo(() => {
    const decimals = TOKEN_DECIMALS[takerTokenSymbol] ?? 0; 
    return (Number(accountQuery.data?.takerAmount) / 10 ** decimals).toFixed(4);
  }, [accountQuery.data?.takerAmount, takerTokenSymbol]);

  const handleAcceptEscrow = async () => {
    await acceptEscrow.mutateAsync();
  }

  return accountQuery.isLoading ? (
    <div className="flex justify-center items-center p-6">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  ) : (
    <div className="card w-full bg-base-200 shadow-xl border border-primary p-6">
      <div className="card-body items-center text-center space-y-4">
        <h2 
          className="text-2xl font-bold text-primary cursor-pointer hover:underline" 
        >
          {maker.toString().slice(0, 8)}...{maker.toString().slice(-8)}
        </h2>

        <div className="flex flex-col items-center space-y-2">
          <p className="text-lg font-semibold">
            Offering: <span className="text-secondary">{Number(makerAmount)} SOL</span>
          </p>
          <p className="text-lg font-semibold">
            Wants: <span className="text-secondary">{Number(takerAmount)} {takerTokenMint.toString()}</span>
          </p>
        </div>
        <button onClick={handleAcceptEscrow}>Accept offer</button>
      </div>
    </div>
  )
}
