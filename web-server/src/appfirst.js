const express = require('express');

const app = express();

app.get('', (req, res) => {
    res.send('hello Express !');
});

app.get('/help', (req, res) => {
    res.send("This is the help page!")
});

app.get('/about', (req, res) => {
    res.send('This is the about page');
});

app.get('/weather', (req, res) => {
    res.send("<h2>WEATHER<h2>")
})

app.listen(3000, () => {
    console.log("server started on port 3000");
    
});