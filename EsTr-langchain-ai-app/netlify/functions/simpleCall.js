import { ChatOpenAI } from "langchain/chat_models/openai";
// import { SerpAPI } from 'langchain/tools';
import { BraveSearch } from "langchain/tools";

import { Calculator } from 'langchain/tools/calculator';
import { ChatAgent, AgentExecutor } from 'langchain/agents';
import * as dotenv from 'dotenv';

export async function handler(event) {
    dotenv.config();
    const keyOpenAPI = process.env.VITE_OPENAI_API_KEY;
      const keyBrave = process.env.VITE_BRAVE_API;
    // const keySerp = process.env.VITE_SERP_API;

    const { message } = JSON.parse(event.body);


    const model = new ChatOpenAI({
        openAIApiKey: keyOpenAPI,
        modelName: 'gpt-3.5-turbo',
        temperature: 0,
        verbose: true,
    });


    const tools = [
           new BraveSearch({
            apiKey:keyBrave
        }),
        // new SerpAPI(keySerp, {
        //     hl: 'en',
        //     gl: 'us',
        // }),
        new Calculator(),
    ];

    const agent = ChatAgent.fromLLMAndTools(model, tools);

    try {
        const executor = AgentExecutor.fromAgentAndTools({
            agent: agent,
            tools: tools,
            verbose: true,
        });

        const response = await executor.run(message);
        console.log('rrrr----', response.toString());
        return {
            statusCode: 200,
            body: JSON.stringify({
                response: response,
            }),
        }
    } catch (error) {
        console.log('Error!!!!');
        return {
            statusCode: 400,
            body: JSON.stringify({
                response: 'Sorry something went wrong with this search. Could you be more specific, please.',
            }),
        };
    }
}
