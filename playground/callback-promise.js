const doWorkCallback = (callback) => {
    setTimeout(() => {
        // callback("this is an error", undefined)
        callback(undefined, [1,3,4])
    })
}

doWorkCallback((err, result) => {
    if (err) {
        return console.log(err)
    }

    console.log(result);
    
});