const request = require('postman-request');
const config = require('../config')

const geocode = (query, callback) => {
    if (!query) return callback('Address wasn\'t provided.');

    request({
        url: `${config.GEOCODING_URL}mapbox.places/${encodeURIComponent(query)}.json?access_token=${config.GEOCODING_API_KEY}`,
        json: true
    }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to geocoding services!');
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search!')
        } else {
            const result = body.features[0];

            callback(undefined, {
                longitude: result.center[0],
                latitude: result.center[1],
                location: result.place_name
            })
        }
    })
}

module.exports = geocode;