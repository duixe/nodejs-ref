const request = require('request');

// 👇 before destructuring
// const geocode = (city, callback) => {
//     const url =  `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=pk.eyJ1IjoiZHVpeGUiLCJhIjoiY2thd2VrZDhvMGt6OTMzcGNiNHFlZHl3YyJ9.kLlkjqk6Kw8UNs5RxJwx2g`

//     request({ url: url, json: true }, (err, res) => {
//         if (err) {
//             callback('Unable to connect to location service', undefined)
//         } else if(res.body.features.length === 0) {
//             callback('Unable to find Location. Try another search', undefined)
//         }else {
//             callback(undefined, {
//                 latitude: res.body.features[0].center[1],
//                 longitude: res.body.features[0].center[0],
//                 location: res.body.features[0].place_name
//             })
//         }
//     });
// }


// 👇 after destructuring
const geocode = (city, callback) => {
    const url =  `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=pk.eyJ1IjoiZHVpeGUiLCJhIjoiY2thd2VrZDhvMGt6OTMzcGNiNHFlZHl3YyJ9.kLlkjqk6Kw8UNs5RxJwx2g`

    // 👇 destructured applied
    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback('Unable to connect to location service', undefined)
        } else if(body.features.length === 0) {
            callback('Unable to find Location. Try another search', undefined)
        }else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    });
}

module.exports = geocode
