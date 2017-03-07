const { Transform } = require('stream')

const transformStream = Transform()

const limit = 10 // store max num words

let i = 0 // keep track fo number of words

transformStream._transform = (buffer, _, done) => {
  if(i < limit) done(null, `${buffer.toString()}\n`)
  i++
}

module.exports.transformStream = transformStream
