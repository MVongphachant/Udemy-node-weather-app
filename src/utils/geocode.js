const request = require('request')


const geocode = (address, callback) => {
    const url = `http://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibXZvbmcxIiwiYSI6ImNra3Ztd3d0dDBidXcydXBmZDJhZnAwd3AifQ.Vgllv7aIrItSOLkhIzZmIg&limit=1`
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('unable to connect to location services', undefined)
        } else if (body.features.length === 0) {
            callback('unable to find location. Try another search', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode