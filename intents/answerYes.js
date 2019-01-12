module.exports = (agent) => {
  console.log('answer yes');
  agent.add('answer yes');

  agent.setFollowupEvent('QUERY');
};
