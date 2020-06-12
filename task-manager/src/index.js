const express = require('express')
require('./db/mongoose-conn');

// load in routers
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task')

const app = express();

const port = process.env.PORT || 3000

// adding a middleware
// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send('GET requests are disabled')
//     }else {
//         next()
//     }
// })

// app.use((req, res, next) => {
//     res.status(503).send('Please the site is currently on maintenance try again in 30 mins time')
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

const jwt = require('jsonwebtoken')

// const myFunction = async () => {
//     const token = jwt.sign({_id: 'abc123'}, 'sessioninnode', {expiresIn: '7 days'})
//     console.log(token);

//     const data = jwt.verify(token, 'sessioninnode')
//     console.log(data);

// }

// myFunction()

app.listen(port, () => {
    console.log("server is up and running on port " + port);
})

const Task = require('./models/task')
const User = require('./models/user')

const main = async () => {
    // const task = await Task.findById("5ee27f89c4f3629c536dc6a0")

    // // nb: 'owner' here is the name of the owner schema from the task model
    // await task.populate('owner').execPopulate()
    // console.log(task.owner);

    const user = await User.findById('5ee27d7536db3b929d079ea5')
    // nb: 'tasks' is name from the userSchema.virtual('task')
    await user.populate('tasks').execPopulate()
    console.log(user.tasks)
    
    
}

main()