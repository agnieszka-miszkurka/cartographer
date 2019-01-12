module.exports = (agent) => {
  console.log('answer no');
  agent.add('answer no');

  agent.setFollowupEvent('QUERY');
};
