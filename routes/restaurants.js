'use strict';
const express = require('express');
const request = require('request');
const Factual = require('factual-api');
console.log('**********Factual Info************', process.env.FACTUAL_KEY, process.env.FACTUAL_SECRET);
const factual = new Factual(process.env.FACTUAL_KEY, process.env.FACTUAL_SECRET);

let router = express.Router();

// api/restaurants

router.post('/', (req, res) => {
  console.log(req.body);
  const { q, locality, region } = req.body;
  const limit = 25;
  const offset = req.body.offset || 0;
  console.log(q, locality, region);
  const select = ('factual_id, name, hours, latitude, longitude, locality, price, rating,'
    + 'reservations, address, attire, cuisine, seating_outdoor, reservations');

  factual.get('/t/restaurants-us', { q,
    filters: {
      $and: [{ category_ids: { $excludes: 355 } },
    { $and: [{ locality }, { region }] }],
    },
    sort:
    {
      placerank: 100,
      distance: 50,
    },
    select,
    offset,
    limit }, (error, response) => {
      if (error) return res.status(400).send(error);
      // console.log(response.data);
      res.send(response.data);
    });
});

module.exports = router;
