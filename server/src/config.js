const PROD = process.env.PORT === '8080';

const config = {
  database: {
    url: PROD ? 'mongodb://mongo:27017/assetTracking' : 'mongodb://localhost:27017/assetTracking'
  },
  secret: 'a'
};

module.exports = config;