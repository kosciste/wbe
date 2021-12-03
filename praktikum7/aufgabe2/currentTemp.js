const https = require('https');
const args = process.argv.slice(2);
let data = '';
const options = {
  hostname: 'wttr.in',
  port: 443,
  path: '/'+args[0]+'?format=j1',
  method: 'GET'
}

const req = https.request(options, res => {
  res.on('data', (chunk) => {
    data+=chunk;
  });
  res.on('end',()=>{
    console.log(JSON.parse(data).current_condition[0].temp_C);
  })
});

req.on('error', error => {
  console.error(error)
});

req.end();
