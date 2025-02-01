// index.js
const restify = require('restify');
const registerOauthRoutes = require('./routes/oauthRoutes');
const registerConfigRoutes = require('./routes/configRoutes'); // if you have config routes
const sequelize = require('./sequelize');

const server = restify.createServer();

// Use Restify’s body parser to parse JSON bodies
server.use(restify.plugins.bodyParser());

// Register routes
registerOauthRoutes(server);
registerConfigRoutes(server);

sequelize.sync().then(() => {
  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}).catch(err => {
  console.error('Error syncing database:', err);
});
