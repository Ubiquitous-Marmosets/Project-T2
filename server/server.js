var express = require('express');
var routes = require('./routes.js');
var cors = require('cors');
var Twitter = require('twitter');
var fs = require('fs');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cluster = require('cluster');


var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/', routes);

app.use('/', express.static('HomepageClient'));
app.use('/dashboard', express.static('DashboardClient'));

module.exports = app;
