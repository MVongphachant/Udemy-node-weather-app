const request = require('request')

const forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=b4e28b655697c34377e3793f76df5ad7&query=${long},${lat}&units=f`
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('unable to connect to weather services', undefined)
        } else if (body.error) {
            callback('unable to find location', undefined)
        } else {
            callback(undefined, {
                weatherIconPath: body.current.weather_icons[0],
                currentForecast: `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees. But feels like ${body.current.feelslike} outside. `})
        }
    })
}

module.exports = forecast