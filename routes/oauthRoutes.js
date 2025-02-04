// routes/oauthRoutes.js
const OAuth2Server = require('oauth2-server');
const oauthModel = require('../oauthModel'); // Your renamed OAuth model file
const CustomOAuthRequest = require('../customOAuthRequest');

function registerOauthRoutes(server) {
  const oauth = new OAuth2Server({
    model: oauthModel,
    accessTokenLifetime: 60 * 60, // 1 hour
    allowBearerTokensInQueryString: true,
  });

  // POST /oauth/token: Issue an access token.
  server.post('/oauth/token', async (req, res) => {
    // Create a custom OAuth request that supports JSON
    const request = new CustomOAuthRequest(req);
    const response = new OAuth2Server.Response(res);
    try {
      const token = await oauth.token(request, response);
      res.send(token);
    } catch (err) {
      res.send(400, err);
    }
  });
}

module.exports = registerOauthRoutes;
