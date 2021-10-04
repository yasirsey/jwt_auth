const express = require('express')

//Environment variables
require('dotenv').config({path: `${__dirname}/config/.env`})

//Database Configuration
require('./config/database')

//Express configuration and middlewares
const app = express()

app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`)
})