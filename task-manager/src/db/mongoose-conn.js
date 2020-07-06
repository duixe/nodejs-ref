const mongoose = require('mongoose');
const validator = require('validator');

const connUrl = process.env.MONGOODB_URL;

mongoose.connect(connUrl, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })