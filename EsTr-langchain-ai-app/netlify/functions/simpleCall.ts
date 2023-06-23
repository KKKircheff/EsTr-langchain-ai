// import { OpenAI } from 'langchain';
// import { SerpAPI } from 'langchain/tools';
import { BraveSearch } from 'langchain/tools';

import { Calculator } from 'langchain/tools/calculator';
// import { ChatAgent, AgentExecutor } from 'langchain/agents';
import { initializeAgentExecutorWithOptions } from 'langchain/agents';
import { ChatOpenAI } from 'langchain/chat_models/openai';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'Origin, X-Requested-With, Content-Type, Accept',
};

export const handler = async (event) => {

  const message = event.queryStringParameters.parameter;
  const keyOpenAPI = process.env.VITE_OPENAI_API_KEY;
  const keyBrave = process.env.VITE_BRAVE_API;
  //   const keySERP = process.env.VITE_SERP_API

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
    // new SerpAPI(keySERP,{
    //     hl:'en',
    // }),
    new Calculator(),
  ];

  //   const agent = ChatAgent.fromLLMAndTools(model, tools);

  //   const executor = AgentExecutor.fromAgentAndTools({
  //     agent: agent,
  //     tools: tools,
  //     verbose: true,
  //   });

  const executor = await initializeAgentExecutorWithOptions(tools, model, {
    agentType: 'chat-zero-shot-react-description',
    verbose: true,
  });

  const input = message;

  try {
    const response = await executor.call({ input });
    return {
      statusCode: 200,
      headers: { ...CORS_HEADERS },
      body: JSON.stringify({
        response: response,
      }),
    }
  } catch (error) {
    return {
      statusCode: 400,
      headers: { ...CORS_HEADERS },
      body: JSON.stringify({
        response: `Sorry something went wrong with this search. I tried hard but could not find proper result ${error}`
      }),
    };
  }
};
