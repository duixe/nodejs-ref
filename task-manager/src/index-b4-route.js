const express = require('express')
require('./db/mongoose-conn');

const User = require('./models/user');
const Task = require('./models/task');

const app = express();

const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()  
        res.status(201).send(user)
    } catch (err) {
        res.status(400).send(err)
    }

})

app.get('/users', async (req, res) => {

    try {
        const users = await User.find({})
        res.send(users)
    } catch (err) {
        res.status(500).send()
    }

})

app.get('/users/:id', async (req, res) => {
    // console.log(req.params);
    const _id = req.params.id

    try {
        const user = await User.findById(_id)

        if (!user) {
           return res.status(404).send() 
        }

        res.send(user)
    } catch (err) {
        res.status(500).send()
    }

})

app.patch('/users/:id', async (req, res) => {
    const _id = req.params.id
    const updateParams = Object.keys(req.body)
    const itemsToUpdate = ['name', 'email', 'password', 'age']
    const isValidOperation = updateParams.every((param) => itemsToUpdate.includes(param))

    if (!isValidOperation) {
        return res.status(400).send("error: Invalid updates")
    }

    try {
        const user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (err) {
        res.status(400).send(err)
    }
})

app.delete('/users/:id', async (req, res) => {
    try {
       const user = await User.findByIdAndDelete(req.params.id)
       
       if (!user) {
           return res.status(404).send()
       }

       res.send(user)
    } catch (err) {
        res.status(500).send(err)
    }
})

app.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch (err) {
        res.status(400).send(err) 
    }

})

app.get('/tasks', async (req, res) => {

    try {
        const task = await Task.find({})
        res.send(task)
    } catch (error) {
        res.status(500).send()
    }

})

app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    
    try {
        const task = await Task.findById(_id)

        if (!task) {
            return res.status(404).send() 
        }

        res.send(task)

    } catch (error) {
        res.status(500).send()
    }
})

app.patch('/tasks/:id', async (req, res) => {
    const updateParams = Object.keys(req.body)
    const itemsToUpdate = ['description', 'completed']
    const isValidOperation = updateParams.every(param => itemsToUpdate.includes(param))

    if (!isValidOperation) {
        return res.send("error: oops invalid operation")
    }

    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!task) {
            return res.status(400).send()
        }

        res.send(task)
    } catch (err) {
        res.status(400).send(err)
    }
})

app.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (err) {
        res.status(500).send(err)
    }
})

app.listen(port, () => {
    console.log("server is up and running on port " + port);
})