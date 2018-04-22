const express = require('express');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const uuidv4 = require('uuid/v1');
const config = require('./config');

const router = express.Router();

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

/**
 * Returns a list of assets that has been registered
 */
router.get('/', (req, res) => {
  let db = req.app.locals.db;

  try {
    db.db('assetTracking').collection('asset').find({}, { fields: { _id: 0 } }).toArray((err, result) => {
      if (err) throw err;

      return res.json(result);
    });
  } catch(err) {
    res.status(500);
    return res.json({ message: err })
  }
});

/**
 * Checkout an asset
 * POST: barcode Number
 */
router.post('/checkout', (req, res) => {
  const db = req.app.locals.db;
  const barcodeNumber = req.body.barcodeNumber;
  const userObject = {user: req.auth.username, email: req.auth.email};

  console.log(barcodeNumber, userObject);

  try {
    db.db('assetTracking').collection('asset').findOne(
      { barcode: barcodeNumber },
      (err, result) => {
        if (err) 
          throw err;
        
        if (_.isNull(result))
          return res.status(404).json({a: 'b'});

        // Check if the current item is already been borrowed by someone
        if (!_.isEmpty(result.borrowedBy)) {
          // If it's the same user, ask to return the item
          if(result.borrowedBy.user === userObject.user) {
            return res.status(202).json({}) 
          } else {
            return res.status(500).json({ message: `Already borrowed by ${result.borrowedBy.user}`})
          }
          
        }
          

        // Update borrowedBy for the item
        db.db('assetTracking').collection('asset').updateOne(
          result,
          { $set: { borrowedBy: userObject, borrowedDate: Math.floor((new Date).getTime()/1000) } },
          (err, updated) => {
            if (err) 
              throw err;
          }
        )

        console.log('inserted Borrower');

        // Add a new transaction into the database
        const transactionId = uuidv4();
        const transaction = {transactionId: transactionId, transactor: userObject};

        console.log(transaction);

        db.db('assetTracking').collection('transactions').insert(transaction, (err, result) => {
          if (err)
            throw err;

          console.log('inserted transaction into database');

          return res.status(201).json(transaction)
        });
        
    })
  } catch (err) {
    console.log(err);
    res.status(500);
    return res.json({ message: err })
  }
});

router.post('/checkout/:transactionId', (req, res) => {
  const transactionId = req.params.transactionId;
  const form = req.body;
  const db = req.app.locals.db;

  console.log(form, transactionId);

  db.db('assetTracking').collection('transactions').findOneAndUpdate(
    {transactionId: transactionId},
    { $set: { survey: form }},
    (err, result) => {
      if (err)
        throw err;

      return res.status(201).json(result.value);
    }
  );



});

/**
 * Check in an asset
 */
router.post('/checkin', (req, res) => {
  let db = req.app.locals.db;
  let barcodeNumber = req.body.barcodeNumber;

  try {
    db.db('assetTracking').collection('asset').findOneAndUpdate(
      { barcode: barcodeNumber }, 
      { $set: { borrowedBy: {}, borrowedDate: -1 } },
      { returnNewDocument: true },
      (err, result) => {
      if (err) throw err;
      if (_.isNull(result.value)) return res.status(404).json({});

      return res.json(result.value);
    })
  } catch (err) {
    res.status(500);
    return res.json({ message: err })
  }
});

/**
 * Name, details, number, count, id, borrowedBy
 */
router.post('/register', (req, res) => {
  let db = req.app.locals.db;

  console.log(req.body);

  db.db('assetTracking').collection('asset').insert(req.body);

  return res.status(201).json(req.body);
});

/**
 * Routes based on specific barcodes
 */
router.route('/:barcode')
  .all((req, res, next) => {
    // Getting the item details for the database
    let db = req.app.locals.db;
    let barcode = req.params.barcode;
    req.collection = db.db('assetTracking').collection('asset');

    // TODO: Fetching user information
    try {
      req.collection.findOne({ barcode: barcode }, { fields: { _id: 0 } }, (err, result) => {
        if (err) throw err;
        if (_.isNull(result)) return res.status(404).json({});

        req.asset = result;
        next();
      });
    } catch (err) {
      return res.status(500).json({ message: err })
    }
  })
  // Get an item based on barcode
  .get((req, res) => {
    return res.json(req.asset);
  })
  // Update an item based on barcode
  .put((req, res) => {
    let barcode = req.params.barcode;

    try {
      req.collection.findOneAndUpdate(
        { barcode: barcode }, 
        { $set: req.body },
        { returnNewDocument: true },
        (err, result) => {
          if (err) throw err;

          return res.json(result.value);
        }
      );
    } catch (err) {
      return res.status(500).json({ message: err })
    }
  })
  // Delete an item based on barcode
  .delete((req, res) => {
    let barcode = req.params.barcode;

    try {
      req.collection.findOneAndDelete({ barcode: barcode }, (err, result) => {
        if (err) throw err;

        return res.json(result.value);
      })
    } catch (err) {
      return res.status(500).json({ message: err })
    }
  });

module.exports = router;