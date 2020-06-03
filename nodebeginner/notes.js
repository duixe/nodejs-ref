const fs = require('fs');
const chalk = require('chalk');


const addNote = (title, body) => {
    const notes = loadNotes();
    // const duplicateNotes = notes.filter((note) => note.title === title );
    const duplicateNote = notes.find(note => note.title === title );

    // if (duplicateNotes.length === 0) {

    //     notes.push({
    //         title: title,
    //         body: body
    //     });
    //     saveNotes(notes);
    //     console.log(chalk.blue.inverse('New Note added'));
        
    // } else {
    //     console.log(chalk.red.inverse('Note title taken'));
    // }

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log(chalk.blue.inverse('New Note added')); 
    } else {
        console.log(chalk.red.inverse('Note title taken'));
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
    // try {
        
    //     const bufferedNotes = fs.readFileSync('notes.json');
    //     const dataJSON = bufferedNotes.toString();
    //     return JSON.parse(dataJSON);
    // } catch (error) {
    //     return []
    // }

    if (fs.existsSync('notes.json')) {
        const bufferedNotes = fs.readFileSync('notes.json');
        const dataJSON = bufferedNotes.toString();
        return JSON.parse(dataJSON);
    }else {
        return [];
    }
}


const removeNote = (title) => {
    const notes = loadNotes();
    const noteToKeep = notes.filter((note) => {
        return note.title !== title;
    });

    if (notes.length > noteToKeep.length) {
        console.log(chalk.green.inverse('Note removed!'));
        saveNotes(noteToKeep);
    }else {
        console.log(chalk.red.inverse('no Note found!'));
        
    } 
}

const listNote = () => {
    const notes = loadNotes();

    console.log(chalk.inverse('Your notes...'));

    notes.forEach(note => {
        console.log(note.title);
    });
    
}

const readNote = (title) => {
    const notes = loadNotes();
    const noteFound = notes.find(note => note.title === title);

    if (noteFound) {
        console.log(chalk.blue.inverse(noteFound.title));
        console.log("---------------");
        console.log(noteFound.body);
    } else {
        console.log(chalk.red.inverse(`sorry, ${title} does not match any note title`));
        
    }

    
    
    
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNote: listNote,
    readNote: readNote
}