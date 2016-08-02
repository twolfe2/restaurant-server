'use strict';
const express = require('express');
const request = require('request');

let router = express.Router();

// api/restaurants

router.get('/', (req, res) => {
  res.send('hi from api/restaurants');
});

module.exports = router;
