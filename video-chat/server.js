const path = require('path');
const express = require('express');
const twilio = require('twilio');
const AccessToken = twilio.jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

const app = express();

const TWILIO_ACCOUNT_SID = 'AC2ed7a2a0c2370140aa29d86aa71e5b23';
const TWILIO_API_KEY = 'SK7a842e556de316bbb709fd2ab285adb2';
const TWILIO_API_SECRET = 'DoOR0kJjYc3v5lqmFnJzeCqzxQDyJZRU';

app.get('/token', function (request, response) {
  var identity = request.query.identity;

  // Create an access token which we will sign and return to the client,
  // containing the grant we just created.
  var token = new AccessToken(
    TWILIO_ACCOUNT_SID,
    TWILIO_API_KEY,
    TWILIO_API_SECRET
  );

  // Assign the generated identity to the token.
  token.identity = identity;

  // Grant the access token Twilio Video capabilities.
  var grant = new VideoGrant();
  token.addGrant(grant);

  // Serialize the token to a JWT string and include it in a JSON response.
  response.send({
    identity: identity,
    token: token.toJwt()
  });
});

const public = path.join(__dirname, './public');
app.use('/', express.static(public));

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Express server running on *:' + port);
});
