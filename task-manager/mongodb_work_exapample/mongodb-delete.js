// connecting to a mongodb db and performing CRUD(DELETE) operation

const { MongoClient, ObjectID } = require('mongodb')

const assert = require('assert')

// connection URL
const url = 'mongodb://127.0.0.1:27017'

// database Name
const dbName = 'task-manager'

MongoClient.connect(url, (err, client) => {
    assert.equal(null, err)

    console.log("connected successfully to server");

    const db = client.db(dbName);

    // // NB: returns promise
    // db.collection('users').deleteMany({
    //     age: 27
    // }).then(result => {
    //     console.log(result);
    // }).catch(err => {
    //     console.log(err);
    // })

    // NB: deleteOne also returns a promise
    db.collection('tasks').deleteOne({
        description: "pound some fufu"
    }).then(result => {
        console.log(result);
    }).catch(err => {
        console.log(err);
    })



    client.close();
    
})