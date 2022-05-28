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
      <h3>Excrow Information</h3>
      <div>
        EscAcc: {escAcc} <br />
        EscAvailBal: {escAvailBal} <br />
        EscBal: {escBal} <br />
        EscFee: {escFee}% <br />
        TotalConfirmed: {totalConfirmed} <br />
        TotalDisputed: {totalDisputed} <br />
        TotalItems: {totalItems}
      </div>
    </div>
  )
}
