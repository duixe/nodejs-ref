const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    // setting custom validation
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('please provide a valid email address')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be positive number');
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('password contains password')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }]
}, {
    timestamps: true
})

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner',
})

userSchema.methods.toJSON = function() {
    const userObject = this.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

// creating a custom method and attching to the schema
userSchema.methods.generateAuthToken = async function() {
   
    // the toString() method is used to convert the _id which is an objectId to a string
    const token = jwt.sign({ _id: this._id.toString() }, 'sessioninnode')

    this.tokens = this.tokens.concat({ token })
    await this.save()

    return token

    
}


// creating a custom static method and attching to the schema
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error("Unable to login")
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error("unable to login")
    }

    return user
}

// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

// Delete User task when user is removed
userSchema.pre('remove', async function (next) {
    await Task.deleteMany({'owner': this._id})
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User