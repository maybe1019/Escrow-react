import { useEthers, shortenAddress } from '@usedapp/core'
import React from 'react'

export default function Header() {

  const { account, chainId, deactivate, activateBrowserWallet } = useEthers()

  const handleConnect = () => {
    if(!account) {
      activateBrowserWallet()
    }
    else {
      deactivate()
    }
  }

  return (
    <div>
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
      {
        chainId !== 137 ?
          <p style={{color: 'red'}}>Wrong network. Please change your network.</p>
        : ''
      }
    </div>
  )
}
