module.exports = (agent) => {
  console.log('anser no');
  agent.add('answer no');

  agent.setFollowupEvent('QUERY');
};
