const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/tasks', auth, async (req, res) => {
    // const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (err) {
        res.status(400).send(err) 
    }

})

router.get('/tasks', auth, async (req, res) => {

    try {
        // const task = await Task.find({ owner: req.user._id })
        // both 👇&👆 approach will work
        await req.user.populate('tasks').execPopulate()
        res.send(req.user.tasks)
    } catch (error) {
        res.status(500).send()
    }

})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    
    try {
        // const task = await Task.findById(_id)
        const task = await Task.findOne({ _id, owner: req.user._id })

        if (!task) {
            return res.status(404).send() 
        }

        res.send(task)

    } catch (error) {
        res.status(500).send()
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const updateParams = Object.keys(req.body)
    const itemsToUpdate = ['description', 'completed']
    const isValidOperation = updateParams.every(param => itemsToUpdate.includes(param))

    if (!isValidOperation) {
        return res.send("error: oops invalid operation")
    }

    try {

        const task = await Task.findById(req.params.id)
        updateParams.forEach((update) => task[update] = req.body[update])
        await task.save()

        
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!task) {
            return res.status(400).send()
        }

        res.send(task)
    } catch (err) {
        res.status(400).send(err)
    }
})

router.delete('/tasks/:id', async (req, res) => {
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


module.exports = router