var express = require('express');
var router = express.Router();
const { findAll } = require('../fake-db/data');

router.get('/', function(req, res, next) {
  console.log('req.decodedToken:', req.decodedToken);
  
  res.json(findAll());
});

module.exports = router;
