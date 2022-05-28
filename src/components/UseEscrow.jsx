import React, { useRef } from 'react'

export default function UseEscrow() {
  const purposeRef = useRef()
  const valueRef = useRef()

  const handleCreateItem = () => {
    const purpose = purposeRef.current.value
    const value = parseFloat(valueRef.current.value)
    if(purpose === '' || value === 0 || isNaN(value)) {
      window.alert('Fill the fields')
      return
    }

  }

  return (
    <div>
      <h3>Use Escrow</h3>
      <div className='container'>
        <h5>Create Item</h5>
        Purpose: <input type="text" ref={purposeRef}/> <br />
        Value: <input type="text" ref={valueRef} /> <br />
        <button onClick={handleCreateItem}>Create Item</button>
      </div>
    </div>
  )
}
