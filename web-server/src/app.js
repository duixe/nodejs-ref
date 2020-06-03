const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


// console.log(__dirname);
// console.log(__filename);
// console.log(path.join(__dirname, '../public'));

// 👇 define path for express config
const app = express();
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


// 👇 Setup handlebars engine and view location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// 👇 setup static directory to serve
app.use(express.static(publicDirPath));


app.get('', (req, res) => {
    res.render('index', {
        title: "weather app",
        name: "Emmanuel"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: "Duixe"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        message: "This is the help message we have for you people",
        name: "Duixe"
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }
    console.log(req.query.search);
    
    res.send({
        product: []
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address term"
        })
    }
    
    geocode(req.query.address, (err, { latitude, longitude, location } = {}) => {
        if (err) {
            return res.send({
                error: err
            })
        }

        forecast(latitude, longitude, (err, forecastData) => {
            if (err) {
                return res.send({
                   error: err 
                })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })


    // res.send({
    //     weather: [{
    //         forecast: '23 degree celcius here in koftown',
    //         location: 'koforidua, Eastern Ghana',
    //         address: req.query.address
    //     }]
        
    // })
})

app.get('/help/*', (req, res) => {
    res.render('404help', {
        title: '404',
        name: "Emmanuel Akomaning",
        errorMessage: "help article not found"
    })
})

app.get('*', (req, res) => {
    res.render("404", {
        title: '404',
        name: "Emmanuel Akomaning",
        errorMessage: "404 page not found"
    })
})

app.listen(3000, () => {
    console.log("server started on port 3000");
    
});