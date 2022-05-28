/* global BigInt */

export const toEther = value => {
  let v = BigInt(value) / BigInt(Math.pow(10, 12) + '')
  v = parseInt(v.toString()) / 1000000
  return v
}