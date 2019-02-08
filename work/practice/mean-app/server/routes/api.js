const express = require('express');
const router = express.Router();

const axios = require('axios');
const API = 'https://jsonplaceholder.typicode.com';

router.get('/', (req, res) => {
  res.send('api works');
});

router.get('/posts', (req, res) => {
  // Get posts from the mock api
  // This should ideally be replaced with a service that connects to MongoDB
  axios.get(`${API}/posts`)
    .then(posts => {
      res.status(200).json(posts.data.slice(0, 5));
      // [
      //   {
      //     userId: 1,
      //     id: 1,
      //     title: "sunt aut facere repellat provident",
      //     body: "quia et suscipit suscipit recusandae"
      //   },
      //   ...
      // ]
    })
    .catch(error => {
      res.status(500).send(error)
    });
});

module.exports = router;
