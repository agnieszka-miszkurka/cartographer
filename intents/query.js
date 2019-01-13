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

  const { questions: newQuestions, question, lastQuestion } = await getQuestionText(questionNumber, questions, answers);

  const typeMap = {
    natural_tree: 'a single tree',
    highway_crossing: 'a pedestrian crossing',
    highway_bus_stop: 'a bus stop',
    amenity_parking: 'a parking lot',
    landuse_grass: 'a POŁACIE ZIELENI',
    amenity_bicycle_parking: 'a bicycle parking',
    amenity_atm: 'an ATM',
    covered_no: 'an uncovered walking path',
    covered_yes: 'a covered walking path',
    building_apartments: 'an apartment',
    landuse_retail: 'a shop',
    amenity_fast_food: 'a fast food restaurant',
    amenity_university: 'a university building',
  };

  const text = lastQuestion ? question : `Is there ${question} nearby?`;

  agent.add(
    new Payload(ACTIONS_ON_GOOGLE, {
      expectUserResponse: true,
      richResponse: {
        items: [
          {
            simpleResponse: {
              textToSpeech: '',
              displayText: (questionNumber === 1 ? 'Great! Let\'s begin! ' : ' ') + text,
              ssml: getQuestionRead((questionNumber === 1 ? 'Great! Let\'s begin! ' : ' '), text),
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
      lastQuestion,
      questions: newQuestions,
      questionNumber: questionNumber + 1,
    },
  });
};
