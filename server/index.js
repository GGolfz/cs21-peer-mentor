"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var apiRouter = require("./routes/apiRouter");
var app = express();
app.use(bodyParser.json());
app.get('/', function (req, res, next) {
    res.json({ 'message': 'hi' });
});
app.use('/api', apiRouter);
app.listen(5000, function () {
    console.log('App is listening on port 5000');
});
