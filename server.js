const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./server/database/connection');
const {swaggerDocs} = require("./swagger/swagger")

const app = express();

dotenv.config( { path : 'config.env'} )
const PORT = process.env.PORT || 8080

// log requests
app.use(morgan('tiny'));
app.use(express.json());
app.use(cors())
app.use(session({
    secret: 'mi_clave_secreta',
    resave: false,
    saveUninitialized: false
  }));

// mongodb connection
connectDB();

// parse request to body-parser
app.use(bodyparser.urlencoded({ extended : true}))

// set view engine
app.set("view engine", "ejs")
//app.set("views", path.resolve(__dirname, "views/ejs"))

// load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

// load routers
app.use('/', require('./server/routes/router'))

app.listen(PORT, ()=> { 
  console.log(`Server is running on http://localhost:${PORT}`)
  swaggerDocs(app, PORT)
});