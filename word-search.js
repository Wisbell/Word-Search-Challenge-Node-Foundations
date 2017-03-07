#!/usr/bin/env node

// Require necessary functions
const { createReadStream } = require('fs')
const { split, map } = require('event-stream')
const { Transform } = require('stream')

// How do I use module.exports again?
// const transformStream = require('./limit-ten.js')

const transformStream = Transform()

// This is the list of words I will compare against
const words = '/usr/share/dict/words'

// Store the word I will search for
const searchWord = process.argv[2]

// set up read stream
let readStream = createReadStream(words)

const limit = 10 // store max num words

let i = 0 // keep track fo number of words

// this function will do the word comparison to the words list
const checkWord = (word) => {
  if(word.toUpperCase().startsWith(searchWord.toUpperCase())){
    return word
  }
}

// set up transform function
transformStream._transform = (buffer, _, done) => {
  if(i < limit) done(null, `${buffer.toString()}\n`)
  i++
}

// main function
const findWord = () => {
  readStream
    .pipe(split())
    .pipe(map( (word, done) => {
      done(null, checkWord(word))
    }))
    .pipe(transformStream)
    .pipe(process.stdout)
}



// Run the program
if(!searchWord) console.log("Restart program with an argument")
else {
  findWord()
}
