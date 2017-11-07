const express = require('express');
const path = require('path');
const hbs = require('hbs');
const fs = require('fs');
const app = express();

// IDK HOW TO USE THESE :(
// const geoip = require('geoip-lite');
// const requestIp = require('request-ip');


//////////////////////////////////////////////
// CONFIG
//////////////////////////////////////////////
app.set("view engine", "hbs");
app.set('views', path.join(__dirname, '/src/views'));
app.use(express.static(__dirname + '/src'));
hbs.registerPartials(__dirname + '/src/views/partials');


//////////////////////////////////////////////
// ROUTE HANDLING
//////////////////////////////////////////////
// var routes = require('./routes/routes');
// app.use('/', routes);

app.get('/', (req, res) => {
  res.render('index',  {title: 'JBM Designs'});
});

app.get('/services', (req, res) => {
  res.render('services', {title: 'Possibilities | JBM Designs'});
});

app.get('/about', (req, res) => {
  res.render('about', {title: 'About Me | JBM Designs'});
});

app.get('/contact', (req, res) => {
  res.render('contact', {title: 'Contact | JBM Designs'});
});


//////////////////////////////////////////////
// LISTENING
//////////////////////////////////////////////
var port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is up and running on PORT:${port}`);
});
