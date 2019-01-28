var express = require('express');
var router = express.Router();
const cors = require('cors');

// CORS
router.use(cors());

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

module.exports = router;