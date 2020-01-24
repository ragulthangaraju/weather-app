const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const port = process.env.PORT || 3000
const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index',{
        title:'Weather App',
        name: 'ragul'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title:'About US',
        name: 'were creating application which is really make useful to peoples and these all application are totally free to use'
    })
})

app.get('/about/*', (req, res) => {
    res.send('about1')
})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error:'Please enter search'
        })
    }
    res.send({
        products:[]
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send('Please enter an address')
    } else {
        geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({error})
            }else{
                forecast(latitude, longitude, (forecastError, forecastData) => {
                    if (forecastError) {
                        return res.send({forecastError})
                    }else{
                        res.send({
                            location:location,
                            forecastData:forecastData
                        })
                    }
                })
            }
        })
    }
})

app.get('*', (req, res) => {
    res.send('404 Not found')
})

app.listen(port, () => {
    console.log('server is run on the port 3000')
})
