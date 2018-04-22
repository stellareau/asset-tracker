const PORT = process.env.PORT;

const config = {
  database: {
    url: PORT === 8080 ? 'mongodb://mongo:27017/assetTracking' : 'mongodb://localhost:27017/assetTracking'
  },
  secret: 'a'
};

module.exports = config;