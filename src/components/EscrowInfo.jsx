import { Container } from '@mui/material'
import React, { useEffect, useState } from 'react'

import {
  getEscAcc,
  getEscAvailBal,
  getEscBal,
  getEscFee,
  getTotalConfirmed,
  getTotalDisputed,
  getTotalItems
} from '../utils/escrow'

export default function EscrowInfo() {
  const [escAcc, setEscAcc] = useState('')
  const [escAvailBal, setEscAvailBal] = useState(0)
  const [escBal, setEscBal] = useState(0)
  const [escFee, setEscFee] = useState(0)
  const [totalConfirmed, setTotalConfirmed] = useState(0)
  const [totalDisputed, setTotalDisputed] = useState(0)
  const [totalItems, setTotalItems] = useState(0)

  useEffect(() => {
    const func = async () => {
      setEscAcc(await getEscAcc())
      setEscAvailBal(await getEscAvailBal())
      setEscBal(await getEscBal())
      setEscFee(await getEscFee())
      setTotalConfirmed(await getTotalConfirmed())
      setTotalDisputed(await getTotalDisputed())
      setTotalItems(await getTotalItems())
    }
    func()
  }, [])
  return (
    <div>
      <Container fixed id="escrow-info">
        <h2>Excrow Information</h2>
        <ul className='shadow'>
          <li>
            <div className='info-name'>EscAcc</div>
            <div className='info-value'>{escAcc}</div>
          </li>
          <li>
            <div className='info-name'>EscAvailBal</div>
            <div className='info-value'>{escAvailBal}</div>
          </li>
          <li>
            <div className='info-name'>EscBal</div>
            <div className='info-value'>{escBal}</div>
          </li>
          <li>
            <div className='info-name'>EscFee</div>
            <div className='info-value'>{escFee}%</div>
          </li>
          <li>
            <div className='info-name'>TotalConfirmed</div>
            <div className='info-value'>{totalConfirmed}</div>
          </li>
          <li>
            <div className='info-name'>TotalDisputed</div>
            <div className='info-value'>{totalDisputed}</div>
          </li>
          <li>
            <div className='info-name'>TotalItems</div>
            <div className='info-value'>{totalItems}</div>
          </li>
        </ul>
      </Container>
    </div>
  )
}
