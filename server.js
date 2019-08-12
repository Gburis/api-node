var express = require('express');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

app.listen(8080);


var db = new mongodb.Db(
    'testes',
    new mongodb.Server('kit-corretor-axa-dev.onibusiness.com.br' , 27017, {}),
    {}
);

var routesApi = require('./routes/routes')(app, db);

console.log('Servidor On');

