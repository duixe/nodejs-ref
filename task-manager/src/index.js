const express = require('express')
require('./db/mongoose-conn');

// load in routers
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task')

const app = express();

// const port = process.env.PORT || 3000
// using this👇 instead of this👆 after switching to env variables
const port = process.env.PORT


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.listen(port, () => {
    console.log("server is up and running on port " + port);
})

