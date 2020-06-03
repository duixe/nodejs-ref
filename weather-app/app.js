const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const address = process.argv[2];

// 👇 before applying destructuring
// if (!address) {
//     console.log('please provide an valid address');
    
// }else {
//     geocode(address, (err, data) => {
//         if (err) {
//            return console.log(err);
            
//         }
    
//         forecast(data.latitude, data.longitude, (err, forecastData) => {
//             if (err) {
//                 return console.log('error'); 
//             }
    
//             console.log(data.location);
//             console.log(forecastData);
            
            
//         });
        
//     })
// }


// 👇 after applying destructuring
if (!address) {
        console.log('please provide an valid address');
        
    }else {
        // 👇 destructure applied 
        geocode(address, (err, { latitude, longitude, location }) => {
            if (err) {
               return console.log(err);
                
            }
        
            forecast(latitude, longitude, (err, forecastData) => {
                if (err) {
                    return console.log('error'); 
                }
        
                console.log(location);
                console.log(forecastData);
                
                
            });
            
        })
    }
    
