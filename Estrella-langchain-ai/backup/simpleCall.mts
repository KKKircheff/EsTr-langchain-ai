import { https } from 'firebase-functions';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { BraveSearch } from 'langchain/tools';
import { Calculator } from 'langchain/tools/calculator';
import { initializeAgentExecutorWithOptions } from 'langchain/agents';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'Origin, X-Requested-With, Content-Type, Accept',
};

export const handler = https.onRequest(async (req, res) => {
  const message = req.query.parameter;
  const keyOpenAPI = functions.config().env.key_openapi;
  const keyBrave = functions.config().env.key_brave;

  const model = new ChatOpenAI({
    openAIApiKey: keyOpenAPI,
    modelName: 'gpt-3.5-turbo',
    temperature: 0,
    verbose: true,
  });

  const tools = [
    new BraveSearch({
      apiKey: keyBrave,
    }),
    new Calculator(),
  ];

  const executor = await initializeAgentExecutorWithOptions(
    tools,
    model,
    {
      agentType: 'chat-zero-shot-react-description',
      verbose: true,
    }
  );

  const input = message;

  try {
    const response = await executor.call({ input });
    res.set(CORS_HEADERS);
    res.status(200).json({ response });
  } catch (error) {
    res.set(CORS_HEADERS);
    res.status(400).json({
      response: `Sorry, something went wrong with this search. I tried hard but could not find a proper result. ${error}`,
    });
  }
});