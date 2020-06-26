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
  if (req.body instanceof Array) {
    const createItemsLength = req.body.length;
    const createItems = req.body;
    var test = /(Alabama|Alaska|Arizona|Arkansas|California|Colorado|Connecticut|Delaware|Florida|Georgia|Hawaii|Idaho|Illinois|Indiana|Iowa|Kansas|Kentucky|Louisiana|Maine|Maryland|Massachusetts|Michigan|Minnesota|Mississippi|Missouri|Montana|Nebraska|Nevada|New\sHampshire|New\sJersey|New\sMexico|New\sYork|North\sCarolina|North\sDakota|Ohio|Oklahoma|Oregon|Pennsylvania|Rhode\sIsland|South\sCarolina|South\sDakota|Tennessee|Texas|Utah|Vermont|Virginia|Washington|West\sVirginia|Wisconsin|Wyoming)/gm.test(req.body.state);
    if(test !== true) {
      res.status(401).json({
        message: 'State is not valid.'
      });
      return;
    }
    business.insertMany(createItems, (err, docs) => {
      if (err) {
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
        itemsCreatedCount: createItemsLength,
        data: docs,
        items: createItems
      });
    })
  } else {
    const createItem = req.body;
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
  }
});

// Update record by ID.
businessRouter.post('/:id', auth, (req, res) => {
  var test = /(Alabama|Alaska|Arizona|Arkansas|California|Colorado|Connecticut|Delaware|Florida|Georgia|Hawaii|Idaho|Illinois|Indiana|Iowa|Kansas|Kentucky|Louisiana|Maine|Maryland|Massachusetts|Michigan|Minnesota|Mississippi|Missouri|Montana|Nebraska|Nevada|New\sHampshire|New\sJersey|New\sMexico|New\sYork|North\sCarolina|North\sDakota|Ohio|Oklahoma|Oregon|Pennsylvania|Rhode\sIsland|South\sCarolina|South\sDakota|Tennessee|Texas|Utah|Vermont|Virginia|Washington|West\sVirginia|Wisconsin|Wyoming)/gm.test(req.body.state);
  if(test !== true) {
    res.status(401).json({
      message: 'State is not valid. Please use the full state name. (eg. North Carolina)'
    });
    return;
  }
  business.findOneAndUpdate({ _id: req.params.id }, req.body, {
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

