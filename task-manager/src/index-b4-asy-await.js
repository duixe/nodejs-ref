const express = require('express')
require('./db/mongoose-conn');

const User = require('./models/user');
const Task = require('./models/task');

const app = express();

const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', (req, res) => {
    const user = new User(req.body)

    user.save().then(() => {
        res.status(201).send(user)
    }).catch((err) => {
        res.status(400).send(err)
        
    })
})

app.get('/users', (req, res) => {
    User.find({}).then(users => {
        res.send(users)
    }).catch(err => {
        res.status(500).send()
    })
})

app.get('/users/:id', (req, res) => {
    // console.log(req.params);
    const _id = req.params.id

    User.findById(_id).then((user) => {
        // check cheat num 4 
        if (!user) {
            return res.status(404).send()
        }

        res.send(user)

    }).catch(err => {
        res.status(500).send()
    })
})

app.post('/tasks', (req, res) => {
    const task = new Task(req.body)

    task.save().then(() => {

        res.status(201).send(task)

    }).catch((err) => res.status(400).send(err) )
})

app.get('/tasks', (req, res) => {
    Task.find({}).then(task => {
        res.send(task)
    }).catch(err => {
        res.status(500).send()
    })
})

app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id
    
    Task.findById(_id).then((task) => {
        if (!task) {
            return res.status(404).send("oops something went wrong")
        }

        res.send(task)
    }).catch(err => {
        res.status(500).send()
    })
})

app.listen(port, () => {
    console.log("server is up and running on port " + port);
})