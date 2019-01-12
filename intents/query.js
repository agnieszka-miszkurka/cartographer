const { Suggestion } = require('dialogflow-fulfillment');
const { questions } = require('../store/state');

module.exports = (agent) => {
  const indexContext = agent.context.get('question-index');
  const stepNumber = indexContext.parameters.index;

  console.log(`question number ${stepNumber}`);

  agent.add(questions[stepNumber]);
  agent.add(new Suggestion('yes'));
  agent.add(new Suggestion('no'));

  agent.context.set({
    name: 'question-index',
    lifespan: 30,
    parameters: { index: stepNumber + 1 },
  });
};
