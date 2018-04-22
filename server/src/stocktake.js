const express = require('express');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const config = require('./config');
const ObjectId = require('mongodb').ObjectID;

const router = express.Router();

const stocktakeItem = {
  status: 'New',
  number: '',
  registered: 0,
  counted: 0,
  dateStarted: '',
  dateCompleted: '',
  startedBy: [],
  items: []
};

router.use((req, res, next) => {
  try {
    let token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) return res.status(403).json({ message: err });
      if (_.isUndefined(decoded)) return res.status(403).json({ message: 'Forbidden' });

      req.auth = decoded;
      console.log('Authorized User: ', decoded);
      next();
    });
  } catch (err) {
    console.log(err);
    return res.status(403).json({ message: 'Forbidden' })
  }
});

router.route('/:number')
  .all((req, res, next) => {
    try {
      req.collection = req.app.locals.db.db('assetTracking').collection('stocktake');
      next();
    } catch (err) {
      return res.status(500).json({ message: err })
    }
  })
  .get((req, res) => {

    console.log('Doing a lookup on', req.params.number);

    req.collection.findOne({number: req.params.number}, { fields: { _id: 0 }}, (err, result) => {
      if (err) return err;

      console.log(result);

      if (result.items.length === 0) {
        return res.json([result])
      } else {
        req.collection.aggregate([
          {
            '$match': {
              number: req.params.number
            }
          },
          {
            '$unwind': '$items'
          },
          {
            '$lookup': {
              'from': 'asset',
              'localField': 'items',
              'foreignField': '_id',
              'as': 'assets'
            }
          },
          {
            '$unwind': '$assets'
          },
          {
            '$group': {
              "_id": "$_id",
              status: {$first: '$status'},
              number: {$first: '$number'},
              registered: {$first: '$registered'},
              counted: {$first: '$counted'},
              dateStarted: {$first: '$dateStarted'},
              dateCompleted: {$first: '$dateCompleted'},
              startedBy: {$first: '$startedBy'},
              items: { "$push": "$assets" }
            }
          }
        ]).toArray((err, result) => {
          if (err) throw err;

          console.log(result);

          return res.json(result);
        })
      }

    });
  })
  .post((req, res) => {
  const stocktakeNumber = req.params.number;
  const barcodeNumber = req.body.barcodeNumber;
  const userObject = {user: req.auth.username, email: req.auth.email};

  try {
    // Check if barcode number exists
    req.app.locals.db.db('assetTracking').collection('asset').findOne({barcode: barcodeNumber}, (err, result) => {
      if (err) throw err;

      if (_.isNull(result))
        return res.status(404).json({message: 'Not found'});

      console.log('Found barcode, ', result);

      // Adding item and user to stocktake
      req.collection.findOneAndUpdate({number: stocktakeNumber},
        {$push: {items: result._id},
        $addToSet: {startedBy: userObject.user},
        $inc: {count: 1}},
        (aErr, aResult) => {
          if (aErr) throw aErr;

          console.log('Updated stocktake', aResult);

          return res.json(aResult.value);
        });
    });
  } catch (err) {
    return res.status(500).json({message: err})
  }
});

/**
 * Basic stocktake actions
 */
router.route('/')
  .all((req, res, next) => {
    try {
      req.collection = req.app.locals.db.db('assetTracking').collection('stocktake');
      next();
    } catch (err) {
      return res.status(500).json({ message: err })
    }
  })
  .get((req, res) => {
    req.collection.find({}, { fields: { _id: 0 } }).toArray((err, result) => {
      if (err) throw err;

      return res.json(result);
    });

  })
  .post((req, res) => {
    const db = req.app.locals.db;

    req.collection.find({}).sort({_id:-1}).limit(1).next((err, result) => {
      if (err) throw err;

      let st = {...stocktakeItem};

      if (_.isNull(result)) {
        // First entry
        st.number = 'STK0001'
      } else {
        // Increment stocktake number
        let id = result.number;
        let str = "" + (Number(id.substr(3, id.length)) + 1);
        let pad = "0000";
        let ans = pad.substring(0, pad.length - str.length) + str;

        st.number = 'STK' + ans;
      }

      // Add start date (EPOCH seconds)
      st.dateStarted = Math.floor((new Date).getTime() / 1000);

      // Get number of registered items
      db.db('assetTracking').collection('asset').find({}).count((err, count) => {
        if (err) throw err;

        st.registered = count;
        console.log('Added total items', st.registered);

        // Creating new entry
        req.collection.insertOne(st, (err, stResult) => {
          if (err) throw err;

          console.log('Created new Stocktake', st);

          return res.status(201).json(st);
        })
      });
    })
  })
  .put((req, res) => {
    const item = req.body;

    console.log('Convert all items into Object ID instead of strings');

    if (item.items) {
      item.items = item.items.map(x => {
        return ObjectId(x);
      });
    }

    // Add end date (EPOCH seconds)
    if (item.status === 'Complete') {
      item.dateCompleted = Math.floor((new Date).getTime() / 1000)
    }

    console.log(item);

    req.collection.findOneAndUpdate({number: item.number}, {$set: {status: item.status}}, (err, result) => {
      if (err) throw err;

      return res.status(200).json(result.value)
    })
  });


module.exports = router;