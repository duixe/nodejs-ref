const https = require('https');

const url = "https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&exclude=hourly,daily&appid=5d9fc3940502c964d13f250cf2b7a3a7";

const request = https.request(url, (res) => {
    let data = ''
    res.on('data', (chunk) => {
        data += chunk.toString();
    });

    res.on('end', () => {
        const body = JSON.parse(data)
        console.log(body);
        
        
    });
})

request.on('error', (error) => {
    console.log("An error: ", error);
    
})

request.end();