require('../src/db/mongoose-conn');
const User = require('../src/models/user');


// User.findByIdAndUpdate('5edc139e9ab6f414b156bba5', { age: 24 }).then(user => {
//     console.log(user);
//     return User.countDocuments({ age: 24 })
// }).then(result => {
//     console.log(result);
// }).catch(err => console.log(err))

// the code below solves the problem of promise chaining above 👆
const updateAgeandCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age })

    return count
}

updateAgeandCount('5ede87c561be1213b07ac788', 24).then(count => {
    console.log(count)
}).catch(e => console.log(e))