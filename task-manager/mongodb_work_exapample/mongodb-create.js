// connecting to a mongodb db and performing CRUD(CREATE) operation

// const MongoClient = require('mongodb').MongoClient;
// const ObjectID = require('mongodb').ObjectID

// using obj destructuring for this 👆
const { MongoClient, ObjectID } = require('mongodb');


const assert = require('assert');
 
// Connection URL
const url = 'mongodb://localhost:27017';
 
// Database Name
const dbName = 'task-manager';

// manually generating ids
const id = new ObjectID();
console.log(id);
console.log(id.getTimestamp());


 
// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
//   console.log("Connected successfully to server");
 
  const db = client.db(dbName);

// 1- insertOne is an async operation
  db.collection('users').insertOne({
      _id: id,
      name: 'Emmanuel',
      age: 27,

  }, (error, result) => {
        if (error) {
           return console.log('unable to insert user');
    
        }

        console.log(result.ops);
        
  })
 

// 2- insertMany is also an async operation
// db.collection('users').insertMany([
//     {
//         name: "joshua",
//         age: 27
//     },
//     {
//         name: "Sunday",
//         age: 39
//     }
// ], (error, result) => {
//     if (error) {
//         return console.log('unable to insert documents!');
//     }

//     console.log(result.ops);
    
// })


// 3- creating a task collection and inserting multiple documents
// db.collection('tasks').insertMany([
//     {
//         description: "go for jogging",
//         completed: true
//     },
//     {
//         description: "Visit Gym",
//         completed: false
//     },
//     {
//         description: "code some flutter app",
//         completed: true
//     }
// ], (error, result) => {
//     if (error) {
//         console.log("unable to insert documents!")
//     }

//     console.log(result.ops);
    
// })


//   client.close();
});