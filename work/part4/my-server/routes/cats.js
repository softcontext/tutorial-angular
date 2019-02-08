var express = require('express');
var router = express.Router();

// const cors = require('cors');
// var corsOptions = {
//   origin: '*',
//   credentials: true, // enable set cookie
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
// }
// router.all('*', cors(corsOptions));

router.get('/api/cats', (req, res, next) => {
  res.send({
    cats: [
      { name: 'lilly' }, 
      { name: 'lucy' }
    ]
  })
})
router.get('/api/cats/:name', (req, res, next) => {
  res.send({
    name: req.params.name
  })
})
router.post('/api/cats', (req, res) => {
  res.send(201, req.body);
});
router.put('/api/cats/:name', (req, res) => {
  res.send(200, req.body);
});
router.delete('/api/cats/:name', (req, res) => {
  // 204 No Content: the request was successful but we are not sending back any payload.
  res.sendStatus(204);
});

module.exports = router;
