const fs = require('fs');
const QRCode = require('qrcode');
const csvParser = require('csv-parser');

const urls = [];
const fileNames = [];

// ./list.csv is supposed to have only one column that contains URL.
// The URL is supposed to be like 'https://quiz.dev/party?name=john-doe'
fs.createReadStream('./list.csv')
  .pipe(csvParser())
  .on('data', (data) => {
    const url = Object.values(data)[0];
    urls.push(url);
    let cutFromIndex = url.indexOf('=')+1;
    fileNames.push(url.substring(cutFromIndex)); 
  }).on('end', () => {
    urls.forEach((url, i) => QRCode.toFile(`./generated/${fileNames[i]}.png`, url))
  })