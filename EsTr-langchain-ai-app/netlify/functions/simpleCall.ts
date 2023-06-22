import { ChatOpenAI } from 'langchain/chat_models/openai';
import { BraveSearch } from 'langchain/tools';

// import { Calculator } from 'langchain/tools/calculator';
import { ChatAgent, AgentExecutor } from 'langchain/agents';

export const handler = async (event) => {
  const keyOpenAPI = process.env.VITE_OPENAI_API_KEY;
  const keyBrave = process.env.VITE_BRAVE_API;

  const { message } = JSON.parse(event.body);

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
    // new Calculator(),
  ];

  const agent = ChatAgent.fromLLMAndTools(model, tools);

  const executor = AgentExecutor.fromAgentAndTools({
    agent: agent,
    tools: tools,
    verbose: true,
  });
  try {
    const response = await executor.run(message);
    return {
      statusCode: 200,
      body: JSON.stringify({
        response: response,
      }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        response:
          'Sorry something went wrong with this search. I tried hard but could not find proper result...',
      }),
    };
  }
};
