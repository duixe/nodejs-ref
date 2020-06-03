// setTimeout(()=> {
//     console.log('Your two seconds timeout is up');
// }, 2000);

// const shortNames = ['josh', 'duixe', 'shegs'];
// const printedname = shortNames.filter((names) => {
//     return names.length >= 5;
// });
// console.log(printedname);

// const fakeGeocode = (address, callback) => {
//     setTimeout(() => {
//         const data = {
//             latitude: -23.43,
//             longitude: 33.67
//         }

//         callback(data);

//     }, 2000)

// }

// fakeGeocode('koforidua', (data) => {
//     console.log(data);
// });


const add = (num1 = 1, num2, callback) => {
    setTimeout(() => {
        //  callback(num1 +  num2);

        // use the this 👆 or this 👇

        const sum = num1 + num2;
        callback(sum);
        
    }, 2000)
}

add(1, 4, (sum) => {
    console.log(sum);
})
