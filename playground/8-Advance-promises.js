const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a+b)
        }, 2000)
    })
}


// add(2, 3).then((sum) => {
//     console.log(sum);

//     add(sum, 6).then(sum2 => console.log(sum2))
//     .catch(err => console.log(err))
// }).catch(err => console.log(err))

// promise chaining solves the issue nesting promises in the example above
add(2, 3).then((sum) => {
    console.log(sum)
    return add(sum, 3)
}).then((sum2) => {
    console.log(sum2);
}).catch(e => console.log(e))
