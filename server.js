var express = require('express');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var objectId = require('mongodb').ObjectId
var app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

app.listen(8080);


var db = new mongodb.Db(
    'testes',
    new mongodb.Server('localhost' , 23456, {}),
    {}
);

var routesApi = require('./routes/routes')(app, db, objectId);

console.log('Servidor On');

