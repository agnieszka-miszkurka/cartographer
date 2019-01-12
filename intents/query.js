const { Suggestion } = require('dialogflow-fulfillment');

module.exports = async (agent) => {
  const { parameters: { questions } } = agent.context.get('question-index');

  // TODO new question generation HERE
  const question = `question #${Math.floor(Math.random() * 10) + 1}`;
  // questions.push(question); // JAVASCRIPTOOOO

  agent.add(question);
  console.log(questions);
  console.log(` + ${question}`);

  agent.context.set({
    name: 'question-index',
    lifespan: 30,
    parameters: { questions: [...questions, question] },
  });

  agent.add(new Suggestion('yes'));
  agent.add(new Suggestion('no'));
};
