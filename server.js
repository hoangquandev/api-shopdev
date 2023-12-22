const express = require('express')
require('dotenv').config()
const dbConnect = require('./src/config/dbconnect')
const path = require('path');
// const initRoutes = require('./routes')
const cookieParser = require('cookie-parser')
const initRoutes = require('./src/routes')
const methodOverride = require('method-override');
const cors = require("cors")


const app = express()
app.use(cookieParser())
const port = process.env.PORT || 8080
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'));
app.set('view engine', 'ejs'); // Set EJS as the view engine
app.set('views', path.join(__dirname, './src/views')); // Set the views directory

dbConnect()
initRoutes(app)

app.listen(port, () => {
    console.log('Server running on the port: ' + port);
})