const request = require('request');
const geocode = require('./utils/geocode');

// const url = "https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&exclude=hourly,daily&appid=5d9fc3940502c964d13f250cf2b7a3a7";

// request({ url: url, json: true}, (err, res) => {
//     // const data = JSON.parse(res.body);
//     // console.log(res.body.current);

//     // first challenge
//     if (err) {
//         console.log('unable to connect to weather service');
//     } else if(res.body.error) {
//         console.log('unable to find location');
        
//     } else {
//         console.log(`The temprature is currently ${res.body.current.temp} and the sky is ${res.body.current.weather[0].main}`);
//     }
    
// });

// const geocodeUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/accra.json?access_token=pk.eyJ1IjoiZHVpeGUiLCJhIjoiY2thd2VrZDhvMGt6OTMzcGNiNHFlZHl3YyJ9.kLlkjqk6Kw8UNs5RxJwx2g"

// request({ url: geocodeUrl, json: true }, (err, res) => {
//     if (err) {
//         console.log('Unable to connect to location services');

//     } else if(res.body.features.length === 0) {
//         console.log('Unable to find Location. Try another search');
        
//     }else {
//         const latitude = res.body.features[0].center[0];
//         const longitude = res.body.features[0].center[1];

//         console.log(latitude, longitude);
//     }
    
// });
// geocode('kumasi', (err, data) => {
//     console.log("error: ", err);
//     console.log("data: ", data);
    
// })

