'use strict';
const line = require('@line/bot-sdk');
const express = require('express');
const rp = require('request-promise');

const defaultChannelAccessToken = 'CHANNEL_ACCESS_TOKEN',
  defaultChannelSecret = 'CHANNEL_SECRET';

// create LINE SDK config from env variables
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || defaultChannelAccessToken,
  channelSecret: process.env.CHANNEL_SECRET || defaultChannelSecret,
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/webhook', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(echoEvent))
    .then((result) => res.json(result))
    .catch(error => {
      console.log('Error: Webhook error.')
      console.error(error);
      res.status(500).end();
    });
});

// event handler
function echoEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }
  const rpOptions = {
    uri: 'YOUR_JSON_URL',
    headers: {
      'User-Agent': 'Request-Promise'
    },
    // Automatically parses the JSON string in the response
    json: true
  };
  let requiredMessage = event.message.text,
    // create an echo array
    echo = [],
    // check message object in messaging API 
    // https://developers.line.me/en/docs/messaging-api/reference/#message-objects
    echoMessage = {
      type: "text",
      text: undefined
    },
    echoImage = {
      type: "image",
      originalContentUrl: undefined,
      previewImageUrl: undefined
    };
  echo.push(echoMessage, echoImage);
  rp(rpOptions)
    .then(your_json => {
      // process your json
      console.log(your_json);
      // log messages
      console.log(`userId: ${event.source.userId}
Time: ${new Date(event.timestamp)}
requiredMessage: ${requiredMessage}
echoMapURL: ${echoImage.originalContentUrl || 'undefined'}
echoMessage: ${echoMessage.text || 'undefined'}\n`);
      // use reply API
      return client.replyMessage(event.replyToken, echo);
    })
    .catch(error => {
      console.log('Error: Request-promise error.');
      console.log(error);
    });
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}\n`);
});
