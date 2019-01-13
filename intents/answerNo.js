module.exports = (agent) => {
  const { parameters: { answers } } = agent.context.get('questioning');

  agent.context.set({
    name: 'questioning',
    lifespan: 30,
    parameters: {
      answers: [...answers, false],
    },
  });

  agent.add('');

  agent.setFollowupEvent('QUERY');
};
