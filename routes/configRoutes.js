// routes/configRoutes.js
const OAuth2Server = require('oauth2-server');
const oauthModel = require('../oauthModel'); // updated path
const Config = require('../models/config');

function registerConfigRoutes(server) {
  const oauth = new OAuth2Server({
    model: oauthModel,
    accessTokenLifetime: 60 * 60, // 1 hour
    allowBearerTokensInQueryString: true,
  });

  // PUT /config: Create or update the global configuration.
  server.put('/config', async (req, res) => {
    try {
      // Authenticate the request; only logged-in users may update config.
      const request = new OAuth2Server.Request(req);
      const response = new OAuth2Server.Response(res);
      await oauth.authenticate(request, response);
      
      // Extract configuration fields from the request body.
      const { openingHours, closingHours, expectedChickenCount } = req.body;
      if (!openingHours || !closingHours || expectedChickenCount === undefined) {
        return res.send(400, { error: 'Missing configuration fields' });
      }

      // Since this is a global configuration, we assume there is a single record.
      let config = await Config.findOne();
      if (config) {
        config.openingHours = openingHours;
        config.closingHours = closingHours;
        config.expectedChickenCount = expectedChickenCount;
        await config.save();
      } else {
        config = await Config.create({ openingHours, closingHours, expectedChickenCount });
      }
      res.send(config);
    } catch (error) {
      console.error('Error in PUT /config:', error);
      res.send(500, { error: error.message });
    }
  });

  // GET /config: Retrieve the global configuration.
  server.get('/config', async (req, res) => {
    try {
      // Authenticate the request.
      const request = new OAuth2Server.Request(req);
      const response = new OAuth2Server.Response(res);
      await oauth.authenticate(request, response);
      
      const config = await Config.findOne();
      if (config) {
        res.send(config);
      } else {
        res.send(404, { error: 'Configuration not found' });
      }
    } catch (error) {
      console.error('Error in GET /config:', error);
      res.send(500, { error: error.message });
    }
  });
}

module.exports = registerConfigRoutes;
