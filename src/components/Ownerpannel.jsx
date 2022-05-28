import React, { useRef } from 'react'
import { useEthers } from '@usedapp/core';
import { refundItem, withdrawFund } from '../utils/escrow';

export default function Ownerpannel() {

  const itemIdRef = useRef()
  const toRef = useRef()
  const amountRef = useRef()

  const { account, library } = useEthers()

  const handleRefundItem = async () => {
    const itemId = parseInt(itemIdRef.current.value)
    if(isNaN(itemId)) {
      window.alert('Input Correctly')
      return
    }

    const res = await refundItem(library.provider, account, itemId)
    window.alert(res)
  }

  const handleWithdrawFund = async () => {
    const to = toRef.current.value
    const amount = amountRef.current.value
    if(to === '' || isNaN(parseFloat(amount)) || parseFloat(amount) === 0) {
      window.alert('Input Correctly')
      return
    }

    const res = await withdrawFund(library.provider, account, to, amount)
    window.alert(res)
  }

  return (
    <div>
      <h2>Owner Panel</h2>
      <div className='container'>
        <h4>Refund Item</h4>
        Item Id: <input type="text" ref={itemIdRef} /> <br />
        <button onClick={handleRefundItem}>Refund Item</button>
      </div>

      <div className='container'>
        <h4>Withdraw Fund</h4>
        To: <input type="text" ref={toRef} /> <br />
        Amount: <input type="text" ref={amountRef} /> <br />
        <button onClick={handleWithdrawFund}>Widhdraw Fund</button>
      </div>
    </div>
  )
}
