const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoicmFndWx0aGFuZ2FyYWp1IiwiYSI6ImNrNTNtemFybjBhY3QzaHBoMGd1a3pwa2gifQ.sOZjv8Wg2UwbZVtw0GzFew&limit=1'

    request({ url, json: true }, (error, { body })=>{
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if(body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name,
            })
        }
    })
}

module.exports = geocode