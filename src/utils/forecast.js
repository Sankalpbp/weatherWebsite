const request = require('request');

const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/cd41a9d638db336e1b467cbd4e813a25/' + latitude + ',' + longitude + '?units=si';

    request({ url, json: true }, (error, { body }) => {

        if (error) {
            callback('Unable to connect to the weather services at the moment.', undefined);
        } else if (body.error) {
            callback('Unable to find location.', undefined);
        } else {
            callback(undefined, body.daily.data[0].summary + "It is currently " + body.currently.temperature + " degrees out. There is a " + body.currently.precipProbability + "% chance of rain.");
        }
    });
};

module.exports = forecast;