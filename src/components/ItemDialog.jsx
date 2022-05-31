import { Dialog } from '@mui/material'
import React, { useRef, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { calcTime, toEther } from '../utils/utils';
import { approveRequest, getRequested, confirmDelivery } from '../utils/escrow';
import { useEthers } from '@usedapp/core';
import LoadingButton from '@mui/lab/LoadingButton';
import { useSnackbar } from 'notistack';
import Chip from '@mui/material/Chip';

const status = [
  'OPEN',
  'PENDING',
  'DELIVERY',
  'CONFIRMED',
  'DISPUTTED',
  'REFUNDED',
  'WITHDRAWED',
]

export default function ItemDialog({ handleClose, open, item}) {

  const receiverRef = useRef()
  
  const { library, account} = useEthers()
  const { enqueueSnackbar } = useSnackbar();

  const [approveLoading, setApproveLoading] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [disputeLoading, setDisputeLoading] = useState(false)

  const handleApproveRequest = async () => {
    setApproveLoading(true)
    const receiver = receiverRef.current.value
    if(receiver === '') {
      enqueueSnackbar("Input Correctly", { variant: 'warning' })
      return
    }

    const itemId = parseInt(item.itemId)
    const requested = await getRequested(receiver, itemId)
    if(!requested) {
      enqueueSnackbar("Item not requested.", { variant: 'warning' })
      setApproveLoading(false)
      return
    }
    const res = await approveRequest(
      library.provider,
      account,
      itemId,
      receiver
    )
    const variant = res === 'Failed' ? 'error' : 'success'
    enqueueSnackbar(res, {variant})
    
    setApproveLoading(false)
    handleClose()
  }

  const handleConfirmDelivery = async (flag) => {
    if(flag === true) {
      setConfirmLoading(true)
    }
    else {
      setDisputeLoading(true)
    }

    const res = await confirmDelivery(library.provider, account, parseInt(item.itemId), flag)
    const variant = res === 'Failed' ? 'error' : 'success'
    enqueueSnackbar(res, {variant})

    if(flag === true) {
      setConfirmLoading(false)
    }
    else {
      setDisputeLoading(false)
    }
    handleClose()
  }

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      fullWidth={false}
    >
      <div className='item-modal'>
        <div className='modal-title'>
          Item #{item?.itemId}
          <button onClick={handleClose}><CloseIcon /></button>
        </div>
        <ul>
          <li>
            <div className='info-name'>Id</div>
            <div>{item.itemId}</div>
          </li>
          <li>
            <div className='info-name'>Purpose</div>
            <div>{item.purpose}</div>
          </li>
          <li>
            <div className='info-name'>Amount</div>
            <div>{toEther(item.amount)}</div>
          </li>
          <li>
            <div className='info-name'>Time</div>
            <div>{calcTime(item.timestamp * 1000)}</div>
          </li>
          <li>
            <div className='info-name'>Owner</div>
            <div>{item.owner}</div>
          </li>
          <li>
            <div className='info-name'>Provider</div>
            <div>{item.provider}</div>
          </li>
          <li>
            <div className='info-name'>Status</div>
            <div className={`badge ${status[item.status]}`}>{status[item.status]}</div>
          </li>
          <li>
            <div className='info-name'>Provided</div>
            <div>
              <Chip color={item.provided ? 'success' : 'error'} label={item.provided ? 'True' : 'False'} />
            </div>
          </li>
          <li>
            <div className='info-name'>Confirmed</div>
            <div>
              <Chip color={item.confirmed ? 'success' : 'error'} label={item.confirmed ? 'True' : 'False'} />
            </div>
          </li>
        </ul>
        <div className='action-button'>
          {
            item.status === '0' ? (
              <div className='action-group'>
                <div className='input'>
                  <div>Provider Address</div>
                  <input type="text" ref={receiverRef} placeholder='0x...' />
                </div>
                <div className='buttons'>
                  <LoadingButton
                    loading={approveLoading}
                    loadingIndicator="Approving..."
                    variant="contained"
                    onClick={handleApproveRequest}
                  >
                    Approve Request
                  </LoadingButton>
                </div>
              </div>
            ) : item.status === '2' && item.provided ? (
              <div className='action-group'>
                <div className='buttons'>
                  <LoadingButton
                    loading={confirmLoading}
                    loadingIndicator="Confirming..."
                    variant="contained"
                    onClick={()=>handleConfirmDelivery(true)}
                    color='success'
                  >
                    Confirm
                  </LoadingButton>

                  <LoadingButton
                    loading={disputeLoading}
                    loadingIndicator="Disputing..."
                    variant="contained"
                    onClick={()=>handleConfirmDelivery(false)}
                    color='error'
                  >
                    Dispute
                  </LoadingButton>
                </div>
              </div>
            ) : ''
          }
        </div>
      </div>
    </Dialog>
  )
}
