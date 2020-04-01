const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();
// here is how we instantiate express
const port = process.env.PORT || 3000

// Define paths for Express configuration
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// we use it to serve our website using the folder public
app.use(express.static(publicDirectoryPath));

// express looks for the views directory.
// we can make it look for somewhere else 
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Sankalp Arora',
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Sankalp Arora',
    });
}); 

app.get('/weather', (req, res) => {

    if (req.query.address === undefined) {
        return res.send({
            error: "You must provide the address to the location.",
        });
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {

        if (error) {
            return res.send({ error });
        }

        forecast(latitude, longitude, (error, forecastData) => {
      
          if (error) {
            return res.send({
                error: error,
            });
          }
          
          res.send({
              location: location,
              forecast: forecastData,
              address: req.query.address,
          });
        });
      });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: "We are here to help you out.",
        name: 'Sankalp Arora',
    });
});

app.get('/help/*', (req, res) => {
    res.render('404Page', {
        text: 'Help Article Not Found.',
    });
});

// if nothing would be matched, then, this will be shown
// that's how we can show our 404 page
app.get('*', (req, res) => {
    res.render('404Page', {
        text: 'Page Not Found',
    });
});

app.listen(port, () => {
    console.log("Server is up at port " + port);
});