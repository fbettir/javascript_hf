
var colors = require('colors');

var express = require('express');
var app = express();


//load routing
require('./route./index')(app);

app.use(express.static('static'));  //middleware

var server = app.listen(3000, function () {
    console.log('On: 3000');
});