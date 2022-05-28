import React from 'react'
import EscrowInfo from '../components/EscrowInfo'
import MyData from '../components/MyData'
import UseEscrow from '../components/UseEscrow'

export default function Escrow() {
  return (
    <div className='Escrow'>
      <EscrowInfo />
      <div className='line'></div>
      
      <UseEscrow />
      <div className='line'></div>

      <MyData />
    </div>
  )
}
