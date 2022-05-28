import React, { useRef } from 'react'
import { useEthers } from '@usedapp/core';
import { createItem, performDelivery } from '../utils/escrow';
import { requestItem, getItem } from './../utils/escrow';

export default function UseEscrow() {
  const purposeRef = useRef()
  const valueRef = useRef()
  const requestItemIdRef = useRef()
  const performItemIdRef = useRef()

  const { account, chainId, library } = useEthers()

  const handleCreateItem = async () => {
    const purpose = purposeRef.current.value
    const value = parseFloat(valueRef.current.value)
    if(purpose === '' || value === 0 || isNaN(value)) {
      window.alert('Fill the fields')
      return
    }
    if(value < 0.001) {
      window.alert('Value should be more than 0.001')
      return
    }

    const res = await createItem(library.provider, account, purpose, value)
    window.alert(res)
  }

  const handleRequestItem = async () => {
    const itemId = parseInt(requestItemIdRef.current.value)
    if(isNaN(itemId)) {
      window.alert('Input Correctly')
      return
    }
    const res = await requestItem(library.provider, account, itemId)
    window.alert(res)
  }

  const handlePerformDelivery = async () => {
    const itemId = parseInt(performItemIdRef.current.value)
    if(isNaN(itemId)) {
      window.alert('Input Correctly')
      return
    }

    const item = await getItem(itemId)
    if(item.provider !== account) {
      window.alert('Service not awarded to you')
      return
    }
    if(item.provided) {
      window.alert('Service already provided')
      return
    }
    if(item.confirmed) {
      window.alert('Service already confirmed')
      return
    }

    const res = await performDelivery(library.provider, account, itemId)
    window.alert(res)
  }

  return (
    <div>
    {
      account && chainId === 80001 ? 
        <div>
          <h2>Use Escrow</h2>
          <div className='container'>
            <h4>Create Item</h4>
            Purpose: <input type="text" ref={purposeRef}/> <br />
            Value: <input type="text" ref={valueRef} /> <br />
            <button onClick={handleCreateItem}>Create Item</button>
          </div>

          <div className='container'>
            <h4>Request Item</h4>
            Item Id: <input type="text" ref={requestItemIdRef} />
            <button onClick={handleRequestItem}>Request Item</button>
          </div>

          <div className='container'>
            <h4>Perform Delivery</h4>
            Item Id: <input type="text" ref={performItemIdRef} />
            <button onClick={handlePerformDelivery}>Perform Delivery</button>
          </div>
        </div>
      : ''
    }
    </div>
  )
}
