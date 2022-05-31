/* global BigInt */

export const toEther = value => {
  let v = BigInt(value) / BigInt(Math.pow(10, 12) + '')
  v = parseInt(v.toString()) / 1000000
  return v
}

export const calcTime = timestamp => {
  let t = Date.now() - timestamp

  t = parseInt(t / 1000) // to sec
  let day = parseInt(t / 24 / 60 / 60)
  
  if(day > 1) return `${day} days ago`
  else if(day === 1) return '1 day ago'

  let hour = parseInt(t / 60 / 60)
  t = t % (60 * 60)
  let min = parseInt(t / 60)
  let sec = t % 60
  if(hour > 0) return `${hour}hr ${min}min ago`
  if(min > 0) return `${min} min ago`
  return `${sec} sec ago`
}

export const shortenText = str => {
  if(str.length > 20) {
    return str.substring(0, 18) + "..."
  }
  return str
}