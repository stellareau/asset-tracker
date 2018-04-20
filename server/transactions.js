const express = require('express');

const router = express.Router();

/**
 * Returns a list of assets that has been registered
 */
router.get('/', (req, res) => {
  let db = req.app.locals.db;

  try {
    db.db('assetTracking').collection('transactions').find({}, { fields: { _id: 0 } }).toArray((err, result) => {
      if (err) throw err;

      return res.json(result);
    });
  } catch(err) {
    res.status(500);
    return res.json({ message: err })
  }
});

module.exports = router;