Serverless Responsive LineBot builds on Heroku
---
[![npmjs](https://badge.fury.io/js/%40line%2Fbot-sdk.svg)](https://www.npmjs.com/package/@line/bot-sdk)

A serverless responsive line-bot builds on Heroku

Requirements
---
* **Node.js** 4 or higher

Documents
---
* [Heroku create app](https://devcenter.heroku.com/articles/creating-apps)
* [Line Bot API](https://developers.line.me/en/docs/messaging-api/reference/)
* [Line Bot SDK Nodejs](https://line.github.io/line-bot-sdk-nodejs/)
* [Express](http://expressjs.com/)
* [request-promise](https://www.npmjs.com/package/request-promise)
* [ngrok](https://ngrok.com/)

Getting Start
---
### Install

Make a directory of linebot
```bash
mkdir line-bot-echo
cd line-bot-echo
```

Build dependencies Using [npm](https://www.npmjs.com/):
```bash
npm init
```

Install dependencies
```bash
npm install @line/bot-sdk --save
npm install express --save
npm install request --save
npm install request-promise --save
```

Input *CHANNELACCESSTOKEN* and *CHANNELSECRET* in echo.js
Or you can set in heroku env
```javascript
const defaultAccessToken = 'CHANNEL_ACCESS_TOKEN';
const defaultSecret = 'CHANNEL_SECRET';
```

Create a Procfile
```bash
echo web: node echo.js >> Procfile
```

### Deploy
Deploy to heroku using git
```bash
git init
git add .
git commit -m "First echo."
```

Create heroku app and deploy
```bash
heroku create line-bot-echo-demo
git push heroku master
```

Set env
```bash
heroku config:set CHANNEL_ACCESS_TOKEN=your_channel_access_token
heroku config:set CHANNEL_SECRET=your_channel_secret
```

Start your application
```bash
heroku ps:scale web=1
```

Copy heroku app url to line-bot webhook
```bash
https://line-bot-echo-demo.herokuapp.com/webhook
```

Done!

### View logs
```bash
heroku logs
```

Demo locally with [ngrok](https://ngrok.com/)
---
1. Simply run echo.js
```bash
node echo.js
```

  - Open another terminal and run ngrok
```bash
./ngrok http 3000
```

2. Using `heroku local`.
   You need to configure *CHANNELACCESSTOKEN* and *CHANNELSECRET* in .env
  - Copy Heroku config vars to your local .env file
```bash
heroku config:get CHANNEL_ACCESS_TOKEN CHANNEL_SECRET -s  >> .env
```
  - Locally start heroku app
```bash
heroku local
```
  - Open another terminal and start ngrok with the port heroku local open
```bash
./ngrok http ${port}
```
