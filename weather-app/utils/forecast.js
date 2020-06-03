const request = require('request');

// 👇 before destructuring
// const forecast = (lat, long, callback) => {
//     // const url = `api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=7&appid=5d9fc3940502c964d13f250cf2b7a3a7`;
//     const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=hourly,daily&appid=5d9fc3940502c964d13f250cf2b7a3a7`;

//     request({ url: url, json: true }, (err, res) => {
//         if (err) {
//             callback('unable to connect to weather service', undefined);
//         } else if(res.body.error) {
//             callback('unable to find location', undefined)
//         } else {
//             // callback(undefined, {
//             //     weather: res.body.current.weather[0].main,
//             //     temprature: res.body.current.temp
//             // });
//             callback(undefined, `The weather is currently ${res.body.current.weather[0].main} and has a temprature of ${res.body.current.temp} fahrenheit`)
//         }
//     });

// }


// 👇 after destructuring
const forecast = (lat, long, callback) => {
        // const url = `api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=7&appid=5d9fc3940502c964d13f250cf2b7a3a7`;
        const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=hourly,daily&appid=5d9fc3940502c964d13f250cf2b7a3a7`;
    
        // 👇 destructure applied
        request({ url, json: true }, (err, { body }) => {
            if (err) {
                callback('unable to connect to weather service', undefined);
            } else if(body.error) {
                callback('unable to find location', undefined)
            } else {
                // callback(undefined, {
                //     weather: res.body.current.weather[0].main,
                //     temprature: res.body.current.temp
                // });
                callback(undefined, `The weather is currently ${body.current.weather[0].main} and has a temprature of ${body.current.temp} fahrenheit`)
            }
        });
    
    }

module.exports = forecast