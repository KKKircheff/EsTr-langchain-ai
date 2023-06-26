import * as functions from 'firebase-functions';
import { OpenAI } from 'langchain';

export const handler = functions.https.onCall(async (data, context) => {

  const{message} = data; 
  const keyOpenAPI = functions.config().openai.key;

  const model = new OpenAI({
    openAIApiKey: keyOpenAPI,
    modelName: 'gpt-3.5-turbo',
    temperature: 0,
  });

  try {
    const response = await model.call(message);
      return response
  } catch (error) {
      return `Sorry something went wrong with this search. Could you be more specific, please. ${error.name} ${error.message}`
  }
})
