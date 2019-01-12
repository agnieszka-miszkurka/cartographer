module.exports = (agent) => {
  agent.add('');

  agent.context.set({
    name: 'question-index',
    lifespan: 30,
    parameters: { questions: [] },
  });

  agent.setFollowupEvent('QUERY');
};
