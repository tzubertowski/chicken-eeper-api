// index.js
const restify = require('restify');
const registerOauthRoutes = require('./routes/oauthRoutes');
const registerConfigRoutes = require('./routes/configRoutes');
const sequelize = require('./sequelize');

const server = restify.createServer();

// Parse request bodies (JSON and URL-encoded)
server.use(restify.plugins.bodyParser());

// Middleware to adjust the content type for /oauth/token requests.
server.use((req, res, next) => {
  if (
    req.url === '/oauth/token' &&
    req.headers['content-type'] &&
    req.headers['content-type'].includes('application/json')
  ) {
    req.headers['content-type'] = 'application/x-www-form-urlencoded';
  }
  return next();
});

// Register the OAuth and config routes
registerOauthRoutes(server);
registerConfigRoutes(server);

// Sync Sequelize models and start the server
sequelize
  .sync()
  .then(() => {
    const port = process.env.PORT || 3000;
    server.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });
