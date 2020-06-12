require('../src/db/mongoose-conn');
const Task = require('../src/models/task');

// Task.findByIdAndDelete('5eda80184691a33a5439df5f').then(task => {
//     console.log(task);
//     return Task.countDocuments({ completed: false })
// }).then(result => {
//     console.log(result); 
// }).catch(err => console.log(err))


const deleteTaskandCount = async (id) => {
    const taskDelete = await Task.findByIdAndDelete(id);
    const taskCount = await Task.countDocuments({ completed: false })

    return taskCount
}

deleteTaskandCount('5ede8baa61be1213b07ac789').then(count => {
    console.log(count)
}).catch(e => console.log(e))