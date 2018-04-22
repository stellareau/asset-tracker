const PROD = process.env.PORT === '8080';

const config = {
  database: {
    url: PROD ? 'mongodb://mongo:27017/assetTracking' : 'mongodb://localhost:27017/assetTracking'
  },
  url: PROD ? 'https://no1applicant.com' : 'http://localhost:3001/',
  secret: 'a'
};

module.exports = config;