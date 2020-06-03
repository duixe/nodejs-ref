const fs = require('fs');
// const book = {
//     title: "The god's are not to blame",
//     author: "Olarotimi Rotifa"
// }

// const bookJson = JSON.stringify(book);
// fs.writeFileSync('1-json.json', bookJson);

const bufferedData = fs.readFileSync('1-json.json');
const dataJSON = bufferedData.toString();
const data = JSON.parse(dataJSON);
console.log(data.title);


