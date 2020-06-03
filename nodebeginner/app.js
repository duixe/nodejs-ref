// const fs = require('fs');
// // fs.writeFileSync('notes.txt', 'overriding the previous text');
// fs.appendFileSync('notes.txt', 'this is the appended data');
const addTwo = require('./utils');
const getNotes = require('./notes');

const name = 'andrew';
const add = addTwo(4, 10);

console.log(add);
console.log(getNotes());

const validator = require('validator');

console.log(validator.isEmail('yahoo.com'));



