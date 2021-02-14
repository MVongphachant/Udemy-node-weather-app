const path = require('path')
const express = require('express')
const hbs = require('hbs')

const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express();
const port = process.env.PORT || 3000

// define paths for Express
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engin and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather app',
        name: 'Mario'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Mario'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Mario'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    
    geocode(req.query.address, (error, body = {}) => {
        if (error) {
            return res.send({error})
        }

        forecast(body.latitude, body.longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location: body.location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 help',
        name: 'mario',
        errorMessage: 'help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'mario',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port' + port)
})