// customOAuthRequest.js
const { Request } = require('oauth2-server');

class CustomOAuthRequest extends Request {
  constructor(req) {
    // If the incoming request is JSON, override its content-type header.
    if (
      req.headers['content-type'] &&
      req.headers['content-type'].includes('application/json')
    ) {
      // Change the header to satisfy oauth2-server's expectations.
      req.headers['content-type'] = 'application/x-www-form-urlencoded';
    }
    // Call the parent constructor with the modified request.
    super(req);
  }

  // Override getParameter to read values from the parsed body if available.
  getParameter(name) {
    // If the original request had a JSON body, it was already parsed by the bodyParser.
    // Use that object to retrieve the parameter.
    if (this.request.body && typeof this.request.body === 'object') {
      return this.request.body[name];
    }
    // Otherwise, fall back to the default behavior.
    return super.getParameter(name);
  }
}

module.exports = CustomOAuthRequest;
