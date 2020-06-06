// connecting to a mongodb db and performing CRUD(UPDATE) operation

const { MongoClient, ObjectID } = require('mongodb')

const assert = require('assert')

// connection URL
const url = 'mongodb://127.0.0.1:27017'

// database Name
const dbName = 'task-manager'

MongoClient.connect(url, (err, client) => {
    assert.equal(null, err)

    // console.log("connected successfully to server");

    const db = client.db(dbName);

    // db.collection('users').updateOne({
    //     _id: new ObjectID("5ed7e2a9fe060970df1b3a31")
    // }, {
    //     $set: {
    //         name: "Theophilus"
    //     }
    // }).then(result => {
    //     console.log(result);
    // }).catch(err => {
    //     console.log(err);
    // })

    // incrementing a value in a field
    // db.collection('users').updateOne({
    //     _id: new ObjectID("5ed7e2a9fe060970df1b3a31")
    // }, {
    //     $inc: {
    //         age: 1
    //     }
    // }).then(result => {
    //     console.log(result);
    // }).catch(err => {
    //     console.log(err);
    // })


    // updating using update many
    db.collection('tasks').updateMany({
        completed: false
    }, {
        $set: {
            completed: true
        }
    }).then(result => {
        console.log(result.modifiedCount)
    }).catch(err => {
        console.log(err);
    })



    client.close();
    
})