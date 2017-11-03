const express = require('express');
const path = require('path');
const geoip = require('geoip-lite');
const app = express();



//////////////////////////////////////////////
// CONFIG
//////////////////////////////////////////////
app.set('views', path.join(__dirname, '/src/views'));
app.set("view engine", "hbs");
app.use(express.static(__dirname + '/src'));



//////////////////////////////////////////////
// ROUTE HANDLING
//////////////////////////////////////////////
// var routes = require('./routes/routes');
// app.use('/', routes);

app.get('/', (req, res) => {
  var geo = (geoip.lookup(req.ip));
  console.log(geo);
  res.render('index');
});


//////////////////////////////////////////////
// LISTENING
//////////////////////////////////////////////
var port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is up and running on PORT:${port}`);
});
