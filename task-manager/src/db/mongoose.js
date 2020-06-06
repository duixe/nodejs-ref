const mongoose = require('mongoose');

const connUrl = 'mongodb://127.0.0.1:27017/task-manager-api';

mongoose.connect(connUrl, { useNewUrlParser: true, useCreateIndex: true })

const User = mongoose.model('User', {
    name: {
        type: String
    },
    age: {
        type: Number
    }
})

// const Myself = new User({
//     name: "Akomaning",
//     age: 26
// })

// Myself.save().then((result) => {
//     console.log(result);
    
// }).catch((err) => {
//     console.log("error!", err);
    
// })

const Task = mongoose.model('Task', {
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
})

const task1 = new Task({
    description: "Start my first task",
    completed: false
})

task1.save().then((task) => {
    console.log(task);
}).catch((err) => {
    console.log("error!", err);
})
