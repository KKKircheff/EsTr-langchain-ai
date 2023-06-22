// import { ChatOpenAI } from 'langchain/chat_models/openai';
// import { SerpAPI } from 'langchain/tools';
// import { Calculator } from 'langchain/tools/calculator';
// import { initializeAgentExecutorWithOptions } from 'langchain/agents';
import * as dotenv from 'dotenv';
// import { OpenAI } from "langchain/llms/openai";
// import { BraveSearch } from "langchain/tools";
// import { LLMChain } from "langchain/chains";
// import { HumanChatMessage } from "langchain/schema"; /* send puur messages */
// import { SystemMessagePromptTemplate, HumanMessagePromptTemplate, ChatPromptTemplate } from "langchain/prompts";

export async function handler(event) {
  dotenv.config();
  const key = process.env.VITE_OPENAI_API_KEY;
  // const keyBrave = import.meta.env.VITE_BRAVE_API;
  const keySerp = process.env.VITE_SERP_API;

  const { message } = JSON.parse(event.body);
  console.log(message);
  

  // const model = new ChatOpenAI({
  //     openAIApiKey: key,
  //     modelName: 'gpt-3.5-turbo',
  //     temperature: 0,
  //     verbose: true,
  // });

  // const tools = [
  //     // new BraveSearch(),
  //     new SerpAPI(keySerp, {
  //         hl: 'en',
  //         gl: 'us',
  //     }),
  //     new Calculator(),
  // ];

  try {
    //   const executor = await initializeAgentExecutorWithOptions(tools, model, {
    //       agentType: 'chat-conversational-react-description',
    //       verbose: true,
    //   });

    //   const response = await executor.call({ input: event.target });

      // const response = await model.call([
      //     new HumanChatMessage(
      //         `answer with 3 sentances in the following message in the language of the prompt: ${message}`
      //     ),
      // ]);

      return {
          statusCode: 200,
          body: JSON.stringify({
              response: message,
          }),
      };
  } catch (error) {
      console.log('Error!!!!');
      return {
          statusCode: 400,
          body: JSON.stringify({ error }),
      };
  }
}
