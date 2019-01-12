module.exports = (agent) => {
  console.log('answer yes');
  agent.add('');

  agent.setFollowupEvent('QUERY');
};
