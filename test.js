const assert = require('assert')
const SerializeBufferArray = require('./index')
const { MAX_SIZE, deserialize, serialize } = SerializeBufferArray

const arr = [
  Buffer.allocUnsafe(0),
  Buffer.allocUnsafe(1),
  Buffer.allocUnsafe(255),
  Buffer.allocUnsafe(256),
  Buffer.allocUnsafe(65535),
  Buffer.allocUnsafe(65536),
  Buffer.allocUnsafe(MAX_SIZE)
]
const start = +new Date()
const serialized = serialize(arr)
const deserialized = deserialize(serialized)
const end = +new Date()
deserialized.map((buf, i) => assert(buf.length === arr[i].length))
deserialized.map((buf, index) =>
  console.log(`index: ${index}, length: ${buf.length}`)
)
console.log('completed in', (end - start) / 1000, 'seconds')
