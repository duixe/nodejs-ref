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



// the documented way of creating schemas and inserting in a model\
// var mongoose = require('mongoose');
//   var Schema = mongoose.Schema;

//   var blogSchema = new Schema({
//     title:  String, // String is shorthand for {type: String}
//     author: String,
//     body:   String,
//     comments: [{ body: String, date: Date }],
//     date: { type: Date, default: Date.now },
//     hidden: Boolean,
//     meta: {
//       votes: Number,
//       favs:  Number
//     }
//   });


// //  to use the schema defination created above we need to convert it to a model we can work with
// var Blog = mongoose.model('Blog', blogSchema); 