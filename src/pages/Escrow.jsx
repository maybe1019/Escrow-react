import React, {useEffect, useState} from 'react'
import EscrowInfo from '../components/EscrowInfo'
import MyData from '../components/MyData'
import UseEscrow from '../components/UseEscrow'
import { useEthers } from '@usedapp/core';
import Ownerpanel from '../components/Ownerpanel';
import { getEscAcc } from './../utils/escrow';

export default function Escrow() {
  const { account } = useEthers()
  const [escAcc, setEscAcc] = useState('')

  useEffect(() => {
    const func = async () => {
      setEscAcc(await getEscAcc())
    }
    func()
  }, [])

  return (
    <div id='escrow'>

      <EscrowInfo />

      {
        escAcc === account ? <Ownerpanel /> : ''
      }
      
      <UseEscrow />

      <MyData />
    </div>
  )
}
