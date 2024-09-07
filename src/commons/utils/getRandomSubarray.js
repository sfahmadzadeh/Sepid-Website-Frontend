function getRandomSubarray (arr, size) {
  const shuffled = arr.slice(0)
  let i = arr.length
  const min = i - size
  let temp
  let index
  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random())
    temp = shuffled[index]
    shuffled[index] = shuffled[i]
    shuffled[i] = temp
  }
  return shuffled.slice(min)
}

export default getRandomSubarray
