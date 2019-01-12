module.exports = (agent) => {
  agent.add('');
  console.log('first question incomin');

  agent.context.set({
    name: 'question-index',
    lifespan: 30,
    parameters: { index: 0 },
  });

  agent.setFollowupEvent('QUERY');
};
