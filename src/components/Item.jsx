import React, { useRef } from 'react'
import { approveRequest, getRequested } from '../utils/escrow';
import { toEther } from './../utils/utils';
import { useEthers } from '@usedapp/core';
import { confirmDelivery } from './../utils/escrow';

const status = [
  'OPEN',
  'PENDING',
  'DELIVERY',
  'CONFIRMED',
  'DISPUTTED',
  'REFUNDED',
  'WITHDRAWED',
]

export default function Item({ item }) {
  const receiverRef = useRef()
  
  const { library, account} = useEthers()

  const handleApproveRequest = async () => {
    const receiver = receiverRef.current.value
    if(receiver === '') {
      window.alert('Fill the fields')
      return
    }

    const itemId = parseInt(item.itemId)
    const requested = await getRequested(receiver, itemId)
    if(!requested) {
      window.alert('Item not requested.');
      return
    }
    const res = await approveRequest(
      library.provider,
      account,
      itemId,
      receiver
    )
    window.alert(res)
  }

  const handleConfirmDelivery = async (flag) => {
    const res = await confirmDelivery(library.provider, account, parseInt(item.itemId), flag)
    window.alert(res)
  }

  return (
    <div className='item'>
      Id: {item.itemId} <br />
      Purpose: {item.purpose} <br />
      Amount: {toEther(item.amount)} <br />
      Time: {(new Date(parseInt(item.timestamp) * 1000)).toString()} <br />
      Owner: {item.owner} <br />
      Provider: {item.provider} <br />
      Status: {status[item.status]} <br />
      Provided: {item.provided ? 'true' : 'false'} <br />
      Confirmed: {item.confirmed ? 'true' : 'false'}
      {
        item.status === '0' ? (
          <div>
            <br />
            Provider Address: <input type="text" ref={receiverRef} />
            <button onClick={handleApproveRequest}>Approve Request</button>
          </div>
        ) : item.status === '2' && item.provided ? (
          <div>
            <br />
            <button onClick={()=>handleConfirmDelivery(true)}>Confirm Delivery</button>
            <button onClick={()=>handleConfirmDelivery(false)}>Dispute</button>
          </div>
        ) : ''
      }
    </div>
  )
}
