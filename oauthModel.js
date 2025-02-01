// oauthModel.js
const db = require('./db'); // or any database helper you use

const oauthModel = {
  // Retrieve an access token from the database
  getAccessToken: async function(token) {
    const [rows] = await db.query('SELECT * FROM tokens WHERE access_token = ?', [token]);
    if (!rows.length) return null;
    const tokenData = rows[0];
    return {
      accessToken: tokenData.access_token,
      accessTokenExpiresAt: tokenData.access_token_expires_at,
      client: { id: tokenData.client_id },
      user: { id: tokenData.user_id }
    };
  },

  // Retrieve client credentials. For testing, accept client 'client' and secret 'secret'
  getClient: async function(clientId, clientSecret) {
    console.log('getClient called with:', { clientId, clientSecret });
    if (clientId === 'client' && clientSecret === 'secret') {
      return { id: 'client', grants: ['password'] };
    }
    return null;
  },

  // Save a token in the database
  saveToken: async function(token, client, user) {
    await db.query('INSERT INTO tokens SET ?', {
      access_token: token.accessToken,
      access_token_expires_at: token.accessTokenExpiresAt,
      client_id: client.id,
      user_id: user.id
    });
    return Object.assign(token, { client, user });
  },

  // Verify user credentials for password grant
  getUser: async function(username, password) {
    const [rows] = await db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
    if (!rows.length) return null;
    return rows[0];
  }
};

module.exports = oauthModel;
