/* eslint-disable id-length */
/* eslint-disable capitalized-comments */
/* eslint-disable max-len */
/* eslint-disable no-magic-numbers */
/* eslint-disable no-undef */
/* eslint-disable prefer-const */
/* eslint-disable init-declarations */
/* eslint-disable no-implicit-globals */
/* eslint-disable max-statements */
/* eslint-disable new-cap */

const express = require('express')
const businessRouter = express.Router()
const business = require('../models/business');

// Root path test. TODO - DELETE
businessRouter.get('/root', (req, res) => {
  res.json({
    status: 200,
    message: 'Business Router root path.'
  });
});


// Get All Business Records in the database. (use for search.)
businessRouter.get('/', (req, res) => {
  business.find({}, (err, data) => {
    try {
      if (err) {
        throw new Error(err);
      }
      res.send({
        status: 200,
        data
      });
    } catch (error) {
      console.log(error);
    }
  })
});

/*
 * Post new businesses to database. Allows for multi-create or single record
 * creation
 */
businessRouter.post('/', (req, res) => {
  if (req.body instanceof Array) {
    const createItemsLength = req.body.length;
    const createItems = req.body;
    business.insertMany(createItems, (err, docs) => {
      if (err) {
        let message;
        const messageArr = err.message.split(':');
        [message, ...rest] = messageArr.reverse().map((element) => element.trim());
        res.status(422).json({
          status: 422,
          error: message
        });

        return;
      }
      res.send({
        status: 201,
        itemsCreatedCount: createItemsLength,
        data: docs,
        items: createItems
      });
    })
  } else {
    const createItem = req.body;
    business.create(createItem, (err, data) => {
      if (err) {
        let message;
        const messageArr = err.message.split(':');
        [message, ...rest] = messageArr.reverse().map((element) => element.trim());
        res.status(422).json({
          status: 422,
          error: message
        });

        return;
      }
      res.send({
        status: 201,
        data,
        item: createItem
      })
    });
  }
});

businessRouter.delete('/delete', (req, res) => {
  if (req.body instanceof Array) {
    business.deleteMany({ _id: { $in: req.body } }, (err, result) => {
      if (err) {
        let message;
        const messageArr = err.message.split(':');
        [message, ...rest] = messageArr.reverse().map((element) => element.trim());
        res.status(422).json({
          status: 422,
          error: message
        });

        return;
      }
      res.json({
        status: 200,
        data: result
      });
    })
  } else {
    business.deleteOne(req.body, (err, result) => {
      if (err) {
        let message;
        const messageArr = err.message.split(':');
        [message, ...rest] = messageArr.reverse().map((element) => element.trim());
        res.status(422).json({
          status: 422,
          error: message
        });

        return;
      }
      res.json({
        status: 200,
        data: result
      });
    })
  }
});

module.exports = businessRouter

