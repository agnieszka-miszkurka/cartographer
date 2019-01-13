const { Payload } = require('dialogflow-fulfillment');

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

// TODO new question generation HERE
const getQuestionText = questionNumber => `Is it question #${questionNumber}?`;

module.exports = (agent) => {
  const { ACTIONS_ON_GOOGLE } = agent;
  const { parameters: { questions, questionNumber } } = agent.context.get('questioning');

  const questionText = getQuestionText(questionNumber);

  agent.add(
    new Payload(ACTIONS_ON_GOOGLE, {
      expectUserResponse: true,
      richResponse: {
        items: [
          {
            simpleResponse: {
              textToSpeech: '',
              displayText: (questionNumber === 1 ? 'Great! Let\'s begin! ' : ' ') + questionText,
              ssml: getQuestionRead((questionNumber === 1 ? 'Great! Let\'s begin! ' : ' '), questionText),
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
      questions: [...questions, questionText],
      questionNumber: questionNumber + 1,
    },
  });
};
