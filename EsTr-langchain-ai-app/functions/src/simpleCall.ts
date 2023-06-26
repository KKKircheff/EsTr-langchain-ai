import * as functions from 'firebase-functions'
// import { https } from 'firebase-functions';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { BraveSearch } from 'langchain/tools';
import { Calculator } from 'langchain/tools/calculator';
import { initializeAgentExecutorWithOptions } from 'langchain/agents';


export const handler = functions.https.onCall(async (data, context) => {
    const { message } = data;
    const keyOpenAPI = process.env.key_openapi;
    const keyBrave = process.env.key_brave;

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
        return response
    } catch (error) {
        return `Sorry, something went wrong with this search. I tried hard but could not find a proper result. ${error}`
    }
});