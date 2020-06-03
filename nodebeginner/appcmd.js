const notes = require('./notes');
const yargs = require('yargs');

// customizing yarg version
yargs.version = '1.1.0';

// create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note Body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
       notes.addNote(argv.title, argv.body)
    }
});

// create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv) {
        notes.removeNote(argv.title);
    }
});

// create List command
yargs.command({
    command: 'list',
    describe: 'List notes',
    handler: function() {
        notes.listNote();
    }
});

// create Read command
yargs.command({
    command: 'read',
    describe: 'Reading a note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string' 
        }
    },
    handler: function(argv) {
        notes.readNote(argv.title);
    }
});

// console.log(yargs.argv);
yargs.parse();
