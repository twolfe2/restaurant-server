'use strict';
const express = require('express');
const request = require('request');
const Factual = require('factual-api');

const factual = new Factual(process.env.FACTUAL_KEY, process.env.FACTUAL_SECRET);

const yelp = require('node-yelp');

const client = yelp.createClient({
  oauth: {
    consumer_key: process.env.YELP_CONSUMER_KEY,
    consumer_secret: process.env.YELP_CONSUMER_SECRET,
    token: process.env.YELP_TOKEN,
    token_secret: process.env.YELP_TOKEN_SECRET,
  },
});

// api/details

let router = express.Router();

router.get('/crosswalk/:factualId', (req, res) => {
  const { factualId } = req.params;
  factual.get(`/t/crosswalk-us?filters={"factual_id": "${factualId}"}`,
    (error, response) => {
      res.send(response.data);
    });
});

router.get('/yelp/:yelpId', (req, res) => {
  const { yelpId } = req.params;
  client.business(yelpId, {
    actionlinks: 'True',
  }).then(data => {
    res.send(data);
  }).catch(err => {
    if (err) {
      return res.status(400).send(err);
    }
    return null;
  });

  // yelp.business(yelpId, {
  //   actionlinks: 'True',
  // })
  //   .then(data => {
  //     res.send(data);
  //   })
  //   .catch(err => {
  //     if (err) {
  //       return res.status(400).send(err);
  //     }
  //     return null;
  //   });
});

router.get('/foursquare/:lat/:long/', (req, res) => {
  const { lat, long } = req.params;
  const FOURSQUARE_ID = process.env.FOURSQUARE_ID;
  const FOURSQUARE_SECRET = process.env.FOURSQUARE_SECRET;
  request
    .get(`https://api.foursquare.com/v2/venues/search?ll=${lat},${long}&limit=1&client_id=${FOURSQUARE_ID}&client_secret=${FOURSQUARE_SECRET}&v=20200531`)
    .on('data', (data) => {
      // if(response[0])
      res.send(data);
    }).on('error', (err) => {
      if (err) {
        return res.status(400).send(err);
      }
      return null;
    });
});


module.exports = router;


