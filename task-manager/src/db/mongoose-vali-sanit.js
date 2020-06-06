const mongoose = require('mongoose');
const validator = require('validator');

const connUrl = 'mongodb://127.0.0.1:27017/task-manager-api';

mongoose.connect(connUrl, { useNewUrlParser: true, useCreateIndex: true })


const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    // setting custom validation
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('please provide a valid email address')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be positive number');
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('password contains password')
            }
        }
    }
})

// const Myself = new User({
//     name: ' Sunday  ',
//     email: "emman@gmail.com  ",
//     age: 27,
//     password: 'password123  '
// })

// Myself.save().then((result) => {
//     console.log(result);
    
// }).catch((err) => {
//     console.log("error!", err);
    
// })

const Task = mongoose.model('Task', {
    description: {
        type: String,
        trim: true,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

const task1 = new Task({
    description: "Start my first task"
})

task1.save().then((task) => {
    console.log(task);
}).catch((err) => {
    console.log("error!", err);
})
