const path = require('path');
const express = require('express');
const hbs = require('hbs');
const config = require('./config');
const geocode = require('./services/geocode');
const forecast = require('./services/forecast');

const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

const app = express();

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Edward Shvetsov'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Edward Shvetsov'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'Some help text',
        name: 'Edward Shvetsov'
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Edward Shvetsov',
        message: 'Help article not found'
    });
});

app.get('/weather', (req, res) => {
    const { address } = req.query;

    if (!address) {
        return res.send({
            error: 'You must provide an address!',
        });
    }

    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            });
        }

        forecast(latitude, longitude, (error, forecast) => {
            if (error) {
                return res.send({
                    error
                });
            }

            return res.send({
                location,
                forecast,
                address
            });
        });
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Edward Shvetsov',
        message: 'Page not found'
    });
});

app.listen(config.PORT, () => {
    console.log(`Server is up on port ${config.PORT}.`);
});