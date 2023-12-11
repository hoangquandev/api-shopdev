const express = require('express')
require('dotenv').config()
const dbConnect = require('./src/config/dbconnect')
// const initRoutes = require('./routes')
const cookieParser = require('cookie-parser')
const initRoutes = require('./src/routes')
const cors = require("cors")


const app = express()
app.use(cookieParser())
const port = process.env.PORT || 8080
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
dbConnect()
initRoutes(app)

app.listen(port, () => {
    console.log('Server running on the port: ' + port);
})