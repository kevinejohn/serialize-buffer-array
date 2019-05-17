# Serialize Buffer Array

[![NPM Package](https://img.shields.io/npm/v/serialize-buffer-array.svg?style=flat-square)](https://www.npmjs.org/package/serialize-buffer-array)

## Use

`npm install --save serialize-buffer-array`

```
const SerializeBufferArray = require('serialize-buffer-array')

const arr = [
  Buffer.allocUnsafe(0),
  Buffer.allocUnsafe(1),
  Buffer.allocUnsafe(255),
  Buffer.allocUnsafe(256),
  Buffer.allocUnsafe(65535),
  Buffer.allocUnsafe(65536),
  Buffer.allocUnsafe(SerializeBufferArray.MAX_SIZE)
]

const serialized = SerializeBufferArray.serialize(arr)
const deserialized = SerializeBufferArray.deserialize(serialized)
// arr === deserialized
```
