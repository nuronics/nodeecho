'use strict';
const express = require("express");
const bodyParser = require("body-parser");
const {dialogflow} = require('actions-on-google');
const app = dialogflow();
const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

restService.post("/webhook", function(req, res) {
  app.intent('ask_for_permissions_detailed', (conv) => {
  // Choose one or more supported permissions to request:
  // NAME, DEVICE_PRECISE_LOCATION, DEVICE_COARSE_LOCATION
  const options = {
    context: 'To address you by name and know your location',
    // Ask for more than one permission. User can authorize all or none.
    permissions: ['NAME', 'DEVICE_PRECISE_LOCATION'],
  };
  conv.ask(new Permission(options));
    console.log("am called");
});
  
  var speech =
    req.body.result &&
    req.body.result.parameters &&
    req.body.result.parameters.echoText
      ? req.body.result.parameters.echoText
      : "Seems like some problem. Speak again.";
      console.log(req.body.result);
      console.log("hello: "+req.body.result.parameters.echoText);
  return res.json({
    speech: speech,
    displayText: speech,
    source: "webhook-echo-sample"
  });
});

restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
