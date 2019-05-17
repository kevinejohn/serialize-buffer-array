const BufferLib =
  typeof window === 'undefined' ? require('buffer') : require('buffer/')
const Buffer = BufferLib.Buffer
const MAX_SIZE = Math.floor(BufferLib.kMaxLength / 2)
const UINT32_SIZE = 4

function deserialize (buf) {
  if (!Buffer.isBuffer(buf)) {
    throw new Error('Invalid buffer')
  }
  let position = 0
  const bufArray = []
  const bufLength = buf.length
  while (position < bufLength) {
    const length = buf.readUInt32LE(position)
    position += UINT32_SIZE
    if (length > MAX_SIZE || position + length > bufLength) {
      throw new Error('Invalid buffer size')
    }
    bufArray.push(buf.slice(position, position + length))
    position += length
  }
  return bufArray
}

function serialize (bufArray) {
  if (!Array.isArray(bufArray)) {
    throw new Error('Invalid buffer array')
  }
  let newArray = []
  for (const buf of bufArray) {
    if (!Buffer.isBuffer(buf)) {
      throw new Error('Invalid buffer')
    }
    if (buf.length > MAX_SIZE) {
      throw new Error(
        `Buffer is too large ${buf.length}. Max size is ${MAX_SIZE}`
      )
    }
    const newBuf = Buffer.alloc(UINT32_SIZE)
    newBuf.writeUInt32LE(buf.length)
    newArray.push(newBuf)
    newArray.push(buf)
  }
  const finalBuf = Buffer.concat(newArray)
  return finalBuf
}

module.exports = {
  serialize,
  deserialize,
  MAX_SIZE,
  Buffer
}
