const fs = require('fs');
const bufferedData = fs.readFileSync('2-json.json');

const parsedData = bufferedData.toString();
const data = JSON.parse(parsedData);
data.name = "Duixe Sunday"
data.country = "canada"

const newUserJson = JSON.stringify(data);
fs.writeFileSync('2-json.json', newUserJson);

