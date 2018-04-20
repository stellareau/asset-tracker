
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const config = require('./config');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const cors = require('cors')
const port = process.env.PORT || 3000;

const app = express();
const router = express.Router();
const options = {
  swaggerDefinition: {
    info: {
      title: 'Asset Tracking',
      version: '1.0.0',
    },
  },
  apis: ['./asset.js'],
};

const swaggerSpec = swaggerJSDoc(options);

app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/v1', router);
app.use('/api/v1/asset', require('./asset'));
app.use('/api/v1/transactions', require('./transactions'));
app.use('/api/v1/auth', require('./auth'));

router.get('/', (req, res) => {
  res.json({ 'message': 'Hello World' });
});

MongoClient.connect(config.database.url, (err, db) => {
  if(err) { console.log("Unable to connect to MongoDB"); }

  // Setting database
  app.locals.db = db;

  // Start the server
  app.listen(port, () => {
    console.log(`listening on ${port}`)
  });
});
