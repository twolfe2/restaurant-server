const express = require('express');

let router = express.Router();


router.use('/restaurants', require('./restaurants'));
router.use('/details', require('./details'));

module.exports = router;
