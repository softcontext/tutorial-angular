var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', {
    layout: 'default',
    template: 'home-template',
    title: 'Express',
    helpers: {
      bar: function() {
        return 'BAR!';
      }
    },
    showHeader: true,
    story: {
      url: 'https://www.google.com/',
      text: 'Google'
    }
  });
});

module.exports = router;
