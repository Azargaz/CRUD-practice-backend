const express = require('express')

require('dotenv').config()

// Express middleware
const helmet = require('helmet')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

// Połączenie z lokalną bazą danych
var db = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    },
    searchPath: ['app_schema']
});

// Kontrolery = zapytania do bd
const main = require('./controllers/main')

// Apka
const app = express()

// Middleware
const whitelist = ['http://localhost:3001']
const corsOptions = {
    origin: function(origin, callback) {
        if(whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}
app.use(helmet())
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(morgan('combined'))

// Ścieżki apki
app.get('/', (req, res) => res.send('hello world'))
app.get('/crud', (req, res) => main.getTableData(req, res, db))
app.post('/crud', (req, res) => main.postTableData(req, res, db))
app.put('/crud', (req, res) => main.putTableData(req, res, db))
app.delete('/crud', (req, res) => main.deleteTableData(req, res, db))

// Połączenie serwera
app.listen(process.env.PORT || 3000, () => {
    console.log(`Aplikacja jest uruchomiona na porcie ${process.env.PORT || 3000}`)
})