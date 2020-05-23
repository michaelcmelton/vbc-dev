/* eslint-disable new-cap */

const express = require('express')
const businessRouter = express.Router()

businessRouter.get('/', (req, res) => {
  res.json({
    status: 200,
    message: 'Business Router root path.'
  });
});

module.exports = businessRouter

