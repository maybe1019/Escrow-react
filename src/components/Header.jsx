import { useEthers, shortenAddress } from '@usedapp/core'
import React from 'react'

export default function Header() {

  const { account, deactivate, activateBrowserWallet } = useEthers()

  const handleConnect = () => {
    if(!account) {
      activateBrowserWallet()
    }
    else {
      deactivate()
    }
  }

  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '4px 20px'
    }}>
      <h1>Escrow</h1>
      <button onClick={handleConnect}>
        { account ? shortenAddress(account) : 'Connect Wallet' }
      </button>
    </header>
  )
}
