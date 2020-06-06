const doWorkPromise = new Promise((resolve, reject) => {
    // resolve([2,4,5])
    reject('something went wrong!')
})

doWorkPromise.then(result => {
    console.log(result);
}).catch(err => {
    console.log("error: ", err)
})