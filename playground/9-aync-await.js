const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (a < 0 || b < 0) {
                reject('Number must be greater than zero')
            }

            resolve(a+b)
        }, 2000)
    })
}

// const doWork = async () => {
//     // throw new Error('something went wrong');
//     // return 'sunday'
// }

const fufillAdd = async () => {
    const sum = await add(2, 5);
    const sum2 = await add(sum, -2)
    const sum3 = await add(sum2, 2)
    return sum3
}

fufillAdd().then(result => {
    console.log('result', result);
}).catch(e => console.log(e))