'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import { WalletButton } from '../solana/solana-provider'
import { AppHero, ellipsify } from '../ui/ui-layout'
import { ExplorerLink } from '../cluster/cluster-ui'
import { useMarketplaceProgram } from './marketplace-data-access'
import { MarketplaceCreate, MarketplaceList } from './marketplace-ui'

export default function MarketplaceFeature() {
  const { publicKey } = useWallet()
  const { programId } = useMarketplaceProgram()

  return publicKey ? (
    <div>
      <AppHero
        title="Marketplace"
        subtitle={''}
      >
        <MarketplaceCreate />
      </AppHero>
      <MarketplaceList />
    </div>
  ) : (
    <div className="max-w-4xl mx-auto">
      <div className="hero py-[64px]">
        <div className="hero-content text-center">
          <WalletButton />
        </div>
      </div>
    </div>
  )
}
