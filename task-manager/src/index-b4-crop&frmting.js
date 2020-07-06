const express = require('express')
require('./db/mongoose-conn');

// load in routers
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task')

const app = express();

const port = process.env.PORT || 3000

const multer = require('multer')
const upload = multer({
    dest: 'images',
    limits: {
        fileSize: 1000000,
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(doc|docx)$/)) {
            return cb(new Error('please upload a word document'))
        }

        cb(undefined, true)
        // cb(new Error("file must be PDF"))
        // cb(undefined, true)
        // cb(undefined, false)
    }

})

app.post('/upload', upload.single('upload'), (req, res) => {
    res.send()
}, (err, req, res, next) => {
    res.status(400).send({ error: err.message })
})



app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.listen(port, () => {
    console.log("server is up and running on port " + port);
})

