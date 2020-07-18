/* eslint-disable no-plusplus */
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
const auth = require('../middleware/auth');

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
businessRouter.post('/', auth, (req, res) => {
    
    if(!req.body.biography) {
      res.status(401).json({
        message: 'About Section is required.'
      });
      return;
    }
    
    // TODO Validation

    const createItem = req.body;
    createItem.createdAt = Date.now();
    createItem.lastUpdated = Date.now();

    business.create(createItem, (err, data) => {
      if (err) {
        console.log(err);
        let message;
        const messageArr = err.message.split(':');
        [message, ...rest] = messageArr.reverse().map((element) => element.trim());
        res.status(401).json({
          message
        });

        return;
      }
      res.send({
        status: 201,
        data,
        item: createItem
      })
    });
});

// Update record by ID.
businessRouter.post('/:id', auth, (req, res) => {
  console.log(req.body);
  if(!req.body.biography) {
    res.status(401).json({
      message: 'About Section is required.'
    });
    return;
  }

  // TODO URL Validation
  const body = req.body;
  body.lastUpdated = Date.now();

  business.findOneAndUpdate({ _id: req.params.id }, body, {
    overwrite: true,
    new: true
  }, (err, doc) => {
    if (err) {
      res.json({
        status: 404,
        message: err.message
      });

      return;
    }
    res.json({
      status: 200,
      data: doc
    });
  });
});

// Delete records. Handles one or multiple IDs.
businessRouter.delete('/delete', auth, (req, res) => {
  if (req.body instanceof Array) {
    business.deleteMany({ _id: { $in: req.body } }, (err, result) => {
      if (err) {
        let message;
        const messageArr = err.message.split(':');
        [message, ...rest] = messageArr.reverse().map((element) => element.trim());
        res.status(401).json({
          message
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
          message
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

// Gets all records for a particular user.
businessRouter.get('/:ownerId', auth, (req, res) => {
  business.find({ ownerId: req.params.ownerId }, (err, data) => {
    if (err) {
      res.json({
        status: 500,
        err: err.message
      });

      return;
    }
    if (data.length === 0) {
      res.json({
        status: 204,
        data: 'No Businesses found for user.'
      });

      return;
    }
    res.json({
      status: 200,
      data
   });
  });
});

module.exports = businessRouter

