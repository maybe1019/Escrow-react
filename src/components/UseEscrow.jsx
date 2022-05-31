import React, { useRef, useState } from 'react'
import { useEthers } from '@usedapp/core';
import { createItem, performDelivery } from '../utils/escrow';
import { requestItem, getItem } from './../utils/escrow';
import { Container } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useSnackbar } from 'notistack';

export default function UseEscrow() {
  const purposeRef = useRef()
  const valueRef = useRef()
  const requestItemIdRef = useRef()
  const performItemIdRef = useRef()

  const { account, chainId, library } = useEthers()
  const { enqueueSnackbar } = useSnackbar();

  const [createLoading, setCreateLoading] = useState(false)
  const [requestLoading, setRequestLoading] = useState(false)
  const [performLoading, setPerformLoading] = useState(false)


  const handleCreateItem = async () => {
    setCreateLoading(true)

    const purpose = purposeRef.current.value
    const value = parseFloat(valueRef.current.value)


    if(purpose === '' || value === 0 || isNaN(value)) {
      enqueueSnackbar("Input Correctly", { variant: 'warning' })
      return
    }
    if(value < 0.001) {
      enqueueSnackbar('Value should be more than 0.001', { variant: 'warning' })
      return
    }

    const res = await createItem(library.provider, account, purpose, value)
    setCreateLoading(false)
    const variant = res === 'Failed' ? 'error' : 'success'
    enqueueSnackbar(res, {variant})
  }

  const handleRequestItem = async () => {
    setRequestLoading(true)
    const itemId = parseInt(requestItemIdRef.current.value)
    if(isNaN(itemId)) {
      enqueueSnackbar("Item not requested.", { variant: 'warning' })
      return
    }
    const res = await requestItem(library.provider, account, itemId)
    setRequestLoading(false)
    const variant = res === 'Failed' ? 'error' : 'success'
    enqueueSnackbar(res, {variant})
  }

  const handlePerformDelivery = async () => {
    const itemId = parseInt(performItemIdRef.current.value)
    if(isNaN(itemId)) {
      enqueueSnackbar("Item not requested.", { variant: 'warning' })
      return
    }

    const item = await getItem(itemId)
    if(item.provider !== account) {
      enqueueSnackbar("Service not awarded to you", { variant: 'warning' })
      return
    }
    if(item.provided) {
      enqueueSnackbar('Service already provided', { variant: 'warning' })
      return
    }
    if(item.confirmed) {
      enqueueSnackbar("Service already confirmed", { variant: 'warning' })
      return
    }
    setPerformLoading(true)
    
    const res = await performDelivery(library.provider, account, itemId)
    setPerformLoading(false)

    const variant = res === 'Failed' ? 'error' : 'success'
    enqueueSnackbar(res, {variant})
  }

  return (
    <div>
    {
      account && chainId === 80001 ? 
        <Container fixed id="use-escrow">
          <h2>Use Escrow</h2>
          <ul  className='shadow'>
            <li className='caption bg-1'>Create Item</li>
            <li className='bg-1'>
              <div>Purpose</div>
              <input type="text" ref={purposeRef} placeholder='Input Purpose'/>
            </li>
            <li className='bg-1'>
              <div>Value</div>
              <input type="text" ref={valueRef} placeholder='Input Value'/>
            </li>
            <li className='bg-1'>
              <div>Action</div>
              <LoadingButton
                loading={createLoading}
                loadingIndicator="Creating..."
                variant="contained"
                onClick={handleCreateItem}
              >
                Create Item
              </LoadingButton>
            </li>

            <li className='caption bg-2'>Request Item</li>
            <li className='bg-2'>
              <div>Item Id</div>
              <input type="text" ref={requestItemIdRef} placeholder='Input Item Id'/>
            </li>
            <li className='bg-2'>
              <div>Action</div>
              <LoadingButton
                loading={requestLoading}
                loadingIndicator="Requesting..."
                variant="contained"
                onClick={handleRequestItem}
              >
                Request Item
              </LoadingButton>
            </li>

            <li className='caption bg-3'>Perform Delivery</li>
            <li className='bg-3'>
              <div>Item Id</div>
              <input type="text" ref={performItemIdRef} placeholder='Input Item Id'/>
            </li>
            <li className='bg-3'>
              <div>Action</div>
              <LoadingButton
                loading={performLoading}
                loadingIndicator="Performing..."
                variant="contained"
                onClick={handlePerformDelivery}
              >
                Perform Delivery
              </LoadingButton>
            </li>
          </ul>
        </Container>
      : ''
    }
    </div>
  )
}
