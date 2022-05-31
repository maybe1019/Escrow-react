import { Container } from '@mui/material'
import { useEthers, shortenAddress } from '@usedapp/core'
import React, { useState } from 'react'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LoadingButton from '@mui/lab/LoadingButton';
import Web3 from 'web3'

import networks from '../data/networks.json'

export default function Header() {

  const {
    account,
    chainId,
    library,
    deactivate,
    activateBrowserWallet
  } = useEthers()

  const [loading, setLoading] = useState(false)

  const handleConnect = async () => {
    setLoading(true)
    if(!account) {
      await activateBrowserWallet()
    }
    else if(chainId === 80001) {
      deactivate()
    }
    else {
      let newChainId = process.env.REACT_APP_CHAIN_ID
      try {
        await library.provider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: Web3.utils.toHex(newChainId) }]
        });
      } catch (switchError) {
        if (switchError.code === 4902) {
          window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [networks[newChainId]]
          })
          .catch((error) => {
            console.log(error.code)
          })
        }
      }
    }
    setLoading(false)
  }

  return (
    <header>
      <Container fixed id="header">
        <h1>Escrow</h1>
        <LoadingButton
          onClick={handleConnect}
          endIcon={<AccountBalanceWalletIcon />}
          loading={loading}
          loadingPosition="end"
          variant="contained"
        >
          {
            !account ? "Connect Wallet"
            : chainId !== 80001 ? "Change Network"
            : shortenAddress(account) }
        </LoadingButton>
      </Container>
    </header>
  )
}
