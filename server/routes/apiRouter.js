"use strict";
var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();
router.use(bodyParser.json());
router.route('/').get(function (req, res, next) {
    res.json({ 'message': 'api' });
});
module.exports = router;
