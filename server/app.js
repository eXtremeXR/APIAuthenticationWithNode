const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/APIAuthentication');

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());

// Routes
app.use('/users', require('./routes/users'));

module.exports = app;
