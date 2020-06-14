const mongoose = require('mongoose');


const taskSchema = new mongoose.Schema({
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
}, {
    timestamps: true
})



const Task = mongoose.model('Task', taskSchema)

module.exports = Task