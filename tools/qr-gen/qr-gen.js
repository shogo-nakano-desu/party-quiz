const fs = require('fs');
const QRCode = require('qrcode');
const csvParser = require('csv-parser');

const urls = [];
const fileNames = [];

// ./list.csv is supposed to have only one column that contains URL.
// The URL is supposed to be 'https://shogo-moe-wedding.vercel.app/menu/firstname-lastname'
// We need to put column name at the top row of the csv.
fs.createReadStream('./list.csv')
  .pipe(csvParser())
  .on('data', (data) => {
    const url = Object.values(data)[0];
    urls.push(url);
    fileNames.push(url.substring(42)); 
  }).on('end', () => {
    urls.forEach((url, i) => QRCode.toFile(`./generated/${fileNames[i]}.png`, url))
  })