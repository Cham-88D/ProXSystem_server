const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const firebaseAuthenticationRouter = require('./routes/firebaseAuthentication');
const cors = require("cors");

const app = express();

const corsOptions = {
    origin: "http://localhost:3000"
}


app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/system', firebaseAuthenticationRouter);

module.exports = app;
