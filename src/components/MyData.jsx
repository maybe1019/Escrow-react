import React, { useEffect, useState } from 'react'
import { useEthers } from '@usedapp/core';
import { getItems } from '../utils/escrow';
import ItemTable from './ItemTable';
import { Container } from '@mui/material';

export default function MyData() {
  const { account, chainId } = useEthers()

  const [myItems, setMyItems] = useState([])

  useEffect(() => {
    if(!account) return
    const func = async () => {
      const res = await getItems(account)
      let items = []
      res.forEach(item => {
        if(item.owner === account) {
          items.push(item)
        }
      });
      setMyItems(items.reverse())
    }
    
    func()
  }, [account])


  return (
    <Container fixed>
      {
        account && chainId+'' === process.env.REACT_APP_CHAIN_ID ? 
          <div id="my-items">
            <h2>My Items</h2>
            <ItemTable items={myItems} />
          </div>
        : ''
      }
    </Container>
  )
}
