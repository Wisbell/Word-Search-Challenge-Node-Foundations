const { Transform } = require('stream')

const transformStream = Transform()

const limitStream = () => {
  transformStream._transform = (buffer, _, done) => {
    if(i < limit) done(null, `${buffer.toString()}\n`)
    i++
  }
}

module.exports.limitStream = limitStream
