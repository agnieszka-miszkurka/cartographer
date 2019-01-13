module.exports = (agent) => {
  const { parameters: { answers, lastQuestion } } = agent.context.get('questioning');

  agent.context.set({
    name: 'questioning',
    lifespan: 30,
    parameters: {
      answers: [...answers, false],
    },
  });

  agent.add('');
  if (lastQuestion) {
    agent.setFollowupEvent('GAME_OVER_NO');
  } else {
    agent.setFollowupEvent('QUERY');
  }
};
