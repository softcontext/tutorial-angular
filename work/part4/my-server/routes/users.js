var express = require('express');
var router = express.Router();

const cors = require('cors');
var corsOptions = {
  origin: 'http://localhost:4200/',
  credentials: true, // enable set cookie
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}
router.all('*', cors(corsOptions));

router.get('/', function(req, res, next) {
  res.send({
    data: 'respond with a resource'
  });
});

module.exports = router;
