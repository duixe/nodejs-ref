const express = require('express');
const  multer = require('multer');
const sharp = require('sharp');
const User = require('../models/user');
const auth = require('../middleware/auth');
const { sendWelcomeMail, sendCancelationEmail } = require('../emails/account');

const router = new express.Router()


router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        sendWelcomeMail(user.email, user.name);
        const token =  await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (err) {
        res.status(400).send(err);
    }

})

// profile pic - avatar
const upload = multer({
    // dest: 'avatars',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            cb(new Error('please upload only jpeg, jpg and png file format'))
        }

        cb(undefined, true)
    }
})
// This 👇 route can be used to create avatar at the same time updating it
router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    const resizedBufferImg = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    req.user.avatar = resizedBufferImg 
    await req.user.save()
    res.send()
}, (err, req, res, next) => {
    res.status(400).send({ error: err.message })
})

router.post('/users/login', async (req, res) => {
    try {
        // findByCredentials is a custom static method created by duixe
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token =  await user.generateAuthToken()
        res.send({ user, token })
        // res.send(user)
    } catch (error) {
        res.status(400).send()
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        // since the user is already authenticated we have access to the user through req.user from our auth middleware
        req.user.tokens = req.user.tokens.filter(eachToken => {
            // req.token is from auth.js 👇 - return true if token in tokens obj != req.token - it will end up remooving the token from the tokens obj
            return eachToken.token !== req.token
        })

        // after removing the token from the user in db 👆, go ahead and save 👇
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

router.post('/users/logoutall', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()

        res.send()
    } catch (err) {
        res.status(500).send()
    }
})

// adding a middleware to seperate file - the required middleware function is added as as a second arguement
// router.get('/users', auth, async (req, res) => {

//     try {
//         const users = await User.find({})
//         res.send(users)
//     } catch (err) {
//         res.status(500).send()
//     }

// })

// transforming the top route to this 👇 route
router.get('/users/me', auth, async (req, res) => {

    res.send(req.user);

})

router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user || !user.avatar) {
            // throw this 👇 error also allows the program to jump out of the if stmt and straight into the catch block
            throw new Error()
        }

        // setting response headers - we use res.set()
        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    } catch (err) {
        res.status(404).send()
    }
})


router.patch('/users/me', auth, async (req, res) => {
    const updateParams = Object.keys(req.body)
    const itemsToUpdate = ['name', 'email', 'password', 'age']
    const isValidOperation = updateParams.every((param) => itemsToUpdate.includes(param))

    if (!isValidOperation) {
        return res.status(400).send("error: Invalid updates")
    }

    try {

        updateParams.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()

        res.send(req.user)  
    } catch (err) {
        res.status(400).send(err)
    }
})

router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})

router.delete('/users/me', auth, async (req, res) => {
    try {
    //    const user = await User.findByIdAndDelete(req.user._id)
       
    //    if (!user) {
    //        return res.status(404).send()
    //    }

       await req.user.remove();
       sendCancelationEmail(req.user.email, req.user.name);
       res.send(req.user);
    } catch (err) {
        res.status(500).send(err)
    }
})






module.exports = router