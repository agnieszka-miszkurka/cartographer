module.exports = (agent) => {
  agent.add('');

  agent.context.set({
    name: 'questioning',
    lifespan: 30,
    parameters: {
      answers: [],
      questions: [],
      questionNumber: 1,
    },
  });

  agent.setFollowupEvent('QUERY');
};
