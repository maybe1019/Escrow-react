import React, { useRef, useState } from 'react'
import { useEthers } from '@usedapp/core';
import { refundItem, withdrawFund } from '../utils/escrow';
import { Container } from '@mui/material';
import { useSnackbar } from 'notistack';
import LoadingButton from '@mui/lab/LoadingButton';

export default function Ownerpanel() {

  const itemIdRef = useRef()
  const toRef = useRef()
  const amountRef = useRef()

  const [refundLoading, setRefundLoading] = useState(false)
  const [withdrawLoading, setWithdrawLoading] = useState(false)

  const { account, library } = useEthers()
  const { enqueueSnackbar } = useSnackbar();

  const handleRefundItem = async () => {
    const itemId = parseInt(itemIdRef.current.value)
    if(isNaN(itemId)) {
      enqueueSnackbar("Input Correctly", { variant: 'warning' })
      return
    }
    setRefundLoading(true)

    const res = await refundItem(library.provider, account, itemId)
    const variant = res === 'Failed' ? 'error' : 'success'
    enqueueSnackbar(res, {variant})

    setRefundLoading(false)
  }

  const handleWithdrawFund = async () => {
    const to = toRef.current.value
    const amount = amountRef.current.value
    if(to === '' || isNaN(parseFloat(amount)) || parseFloat(amount) === 0) {
      enqueueSnackbar("Input Correctly", { variant: 'warning' })
      return
    }
    setWithdrawLoading(true)

    const res = await withdrawFund(library.provider, account, to, amount)
    const variant = res === 'Failed' ? 'error' : 'success'
    enqueueSnackbar(res, {variant})
    
    setWithdrawLoading(true)
  }

  return (
    <Container id='owner-panel' fixed>
      <h2>Owner Panel</h2>

      <div className='form-container'>
        <div className='form-caption'>Refund Item</div>
        <div className='input-container'>
          <div>Item Id</div>
          <input type="text" ref={itemIdRef} placeholder='Input Item Id' />
        </div>
        <div className='buttons'>
          <LoadingButton
            loading={refundLoading}
            loadingIndicator="Refunding..."
            variant="contained"
            onClick={handleRefundItem}
          >
            Refund Item
          </LoadingButton>
        </div>
      </div>

      <div className='form-container'>
        <div className='form-caption'>Withdraw Fund</div>
        <div className='input-container'>
          <div>To</div>
          <input type="text" ref={toRef} placeholder='0x...' />
        </div>

        <div className='input-container'>
          <div>Amount</div>
          <input type="text" ref={amountRef} placeholder='Input Amount' />
        </div>
        <div className='buttons'>
          <LoadingButton
            loading={withdrawLoading}
            loadingIndicator="Withdrawing..."
            variant="contained"
            onClick={handleWithdrawFund}
          >
            Widhdraw Fund
          </LoadingButton>
        </div>
      </div>
    </Container>
  )
}
