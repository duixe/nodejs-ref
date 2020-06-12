const mongoose = require('mongoose');


const Task = mongoose.model('Task', {
    description: {
        type: String,
        trim: true,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        // nb: User 👇 value to ref is the name of the 'User' model
        ref: 'User'

    }
})

module.exports = Task