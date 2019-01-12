/* eslint-disable arrow-parens */
const { WebhookClient } = require('dialogflow-fulfillment');
const startGame = require('../intents/startGame');
const query = require('../intents/query');
const answerYes = require('../intents/answerYes');
const answerNo = require('../intents/answerNo');


const webhookController = (req, res) => {
  const agent = new WebhookClient({ request: req, response: res });

  const intentMap = new Map();
  intentMap.set('StartGame', agents => { console.log('start game'); return startGame(agents); });
  intentMap.set('AfterRulesStart', agents => { console.log('start after rules'); return startGame(agents); });
  intentMap.set('Query', query);
  intentMap.set('AnswerYes', answerYes);
  intentMap.set('AnswerNo', answerNo);

  agent.handleRequest(intentMap);
};

module.exports = webhookController;
