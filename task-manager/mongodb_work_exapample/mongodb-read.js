// connecting to a mongodb db and performing CRUD(READ) operation

const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID


const assert = require('assert')

// connection URL
const url = 'mongodb://127.0.0.1:27017'

// database Name
const dbName = 'task-manager'

MongoClient.connect(url, (err, client) => {
    // assert.equal(null, err)
    if (err) {
        console.log("unable to connect to server")
    }

    // console.log('connected successfully to server');
    const db = client.db(dbName);

    // finding by name
    // db.collection('users').findOne({ name: "joshua" }, (err, user) => {
    //     if (err) {
    //         return console.log('unable to fetch data')
    //     }

    //     console.log(user);
        
    // })

    // // finding by id
    // db.collection('users').findOne({ _id: new ObjectID("5ed7e7c37c8d443f26054ff7") }, (err, user) => {
    //     if (err) {
    //         return console.log('unable to fetch data')
    //     }

    //     console.log(user);
            
    // })

    // NB: find method return a curson hence no callback, this gives us a chance to perform operations
    // like each, forEach, toArray, count, etc.
    // db.collection('users').find({ age: 27}).toArray((err, users) => {
    //     console.log(users);
    // }) 

    // fetching or finding task
    // db.collection('tasks').findOne({ _id: new ObjectID("5ed7d8a8dd9f706d412b5c0a") }, (err, task) => {
    //     if (err) {
    //         return console.log("unable to find task");
    //     }

    //     console.log(task)
    // })

    db.collection('tasks').find({ completed: false }).toArray((err, task) => {
        console.log(task);
    })

     
        

    // client.close();
    
})