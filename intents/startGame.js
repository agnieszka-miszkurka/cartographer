module.exports = (agent) => {
  agent.add('');
  console.log('first question incoming');

  agent.context.set({
    name: 'question-index',
    lifespan: 30,
    parameters: { questions: [] },
  });

  agent.setFollowupEvent('QUERY');
};
