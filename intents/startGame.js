module.exports = (agent) => {
  agent.add('');

  agent.context.set({
    name: 'question-index',
    lifespan: 30,
    parameters: {
      questions: [],
      questionNumber: 1,
    },
  });

  agent.setFollowupEvent('QUERY');
};
