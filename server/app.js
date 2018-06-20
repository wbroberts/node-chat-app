const path = require('path');
const express = require('express');

const app = express();

const publicPath = path.join(__dirname, './../public');

// Static route for the client side
app.use(express.static(publicPath));
// Set up JSON parsing and sets up a body object
app.use(express.json());
// Set up url parsing and includes a body object
app.use(express.urlencoded({extended: false}));

module.exports = app;