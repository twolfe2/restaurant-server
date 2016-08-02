'use strict';
const express = require('express');
const request = require('request');

let router = express.Router();

router.get('/', (req, res) => {
  res.send('hi from api/details');
});


module.exports = router;
