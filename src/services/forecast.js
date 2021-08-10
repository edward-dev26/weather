const request = require('postman-request');
const config = require('../config');

const forecast = (latitude, longitude, callback) => {
    request({
        url: `${config.WEATHER_URL}current?access_key=${config.WEATHER_API_KEY}&query=${latitude}, ${longitude}`,
        json: true
    }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services!');
        } else if (body.error) {
            callback('Unable to find location');
        } else {
            const { temperature, feelslike, weather_descriptions } = body.current;

            callback(undefined, `${weather_descriptions[0]}. It is currently ${temperature} degress out. It feels like ${feelslike} degress out.`);
        }
    });
}

module.exports = forecast;