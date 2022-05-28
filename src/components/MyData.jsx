import React, { useEffect, useState } from 'react'
import { useEthers } from '@usedapp/core';
import { getItems } from '../utils/escrow';
import Item from './Item';

export default function MyData() {
  const { account } = useEthers()

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
      setMyItems(items)
    }
    
    func()
  }, [account])


  return (
    <div>
      {
        account ? 
          <div>
            <h2>My Data</h2>
            <div className='container'>
              <h4>My Items</h4>
              {
                myItems.map(item => <Item key={item.itemId} item={item} />)
              }
            </div>
          </div>
        : ''
      }
    </div>
  )
}
