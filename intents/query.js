const { Payload } = require('dialogflow-fulfillment');
const getQuestionText = require('../helpers/question');

const getQuestionRead = (preface, question) => {
  const random = Math.floor(Math.random() * 4);
  console.log(random);

  return `
<speak>
  ${preface}
  <audio src="https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg"/>
  <break time="0.2s"/>
  <prosody pitch="-${random}st">${question}</prosody>
</speak>`;
};

module.exports = async (agent) => {
  const { ACTIONS_ON_GOOGLE } = agent;
  const { parameters: { questions, questionNumber, answers } } = agent.context.get('questioning');

  const { questions: newQuestions, question } = await getQuestionText(questionNumber, questions, answers);

  agent.add(
    new Payload(ACTIONS_ON_GOOGLE, {
      expectUserResponse: true,
      richResponse: {
        items: [
          {
            simpleResponse: {
              textToSpeech: '',
              displayText: (questionNumber === 1 ? 'Great! Let\'s begin! ' : ' ') + `Is there ${question} nearby?`,
              ssml: getQuestionRead((questionNumber === 1 ? 'Great! Let\'s begin! ' : ' '), `Is there ${question} nearby?`),
            },
          },
        ],
        suggestions: [
          {
            title: 'Yes',
          },
          {
            title: 'No',
          },
        ],
      },
    }),
  );

  agent.context.set({
    name: 'questioning',
    lifespan: 30,
    parameters: {
      questions: newQuestions,
      questionNumber: questionNumber + 1,
    },
  });
};
