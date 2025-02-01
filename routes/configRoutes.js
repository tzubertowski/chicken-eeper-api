// routes/configRoutes.js
const OAuth2Server = require('oauth2-server');
const oauthModel = require('../oauthModel'); // your OAuth model
const Config = require('../models/config'); // your Sequelize config model

function registerConfigRoutes(server) {
  const oauth = new OAuth2Server({
    model: oauthModel,
    accessTokenLifetime: 60 * 60, // 1 hour
    allowBearerTokensInQueryString: true,
  });

  // PUT /config remains unchanged...
  server.put('/config', async (req, res) => {
    try {
      const request = new OAuth2Server.Request(req);
      const response = new OAuth2Server.Response(res);
      await oauth.authenticate(request, response);
      
      const { openingHours, closingHours, expectedChickenCount } = req.body;
      if (!openingHours || !closingHours || expectedChickenCount === undefined) {
        return res.send(400, { error: 'Missing configuration fields' });
      }

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

  // Updated GET /config endpoint
  server.get('/config', async (req, res) => {
    try {
      const request = new OAuth2Server.Request(req);
      const response = new OAuth2Server.Response(res);
      await oauth.authenticate(request, response);
      
      const config = await Config.findOne();
      if (config) {
        res.send(config);
      } else {
        // Return an empty configuration if none is found.
        res.send({
          openingHours: "",
          closingHours: "",
          expectedChickenCount: 0
        });
      }
    } catch (error) {
      console.error('Error in GET /config:', error);
      res.send(500, { error: error.message });
    }
  });
}

module.exports = registerConfigRoutes;
