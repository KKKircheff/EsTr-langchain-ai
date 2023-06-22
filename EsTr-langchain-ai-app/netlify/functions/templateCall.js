
import { ChatOpenAI } from "langchain/chat_models/openai";
// import { OpenAI } from "langchain/llms/openai";
// import { BraveSearch } from "langchain/tools";
import { SerpAPI } from "langchain/tools";
import { Calculator } from "langchain/tools/calculator";
import { LLMChain } from "langchain/chains";
// import { HumanChatMessage } from "langchain/schema"; /* send puur messages */
import { SystemMessagePromptTemplate, HumanMessagePromptTemplate, ChatPromptTemplate } from "langchain/prompts";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import * as dotenv from 'dotenv';

export async function handler(event) {

    dotenv.config();

    const key = process.env.VITE_OPENAI_API_KEY;
    // const keyBrave = process.env.VITE_BRAVE_API;
    const keySerp = process.env.VITE_SERP_API;

console.log(event.target);
console.log(keySerp)
console.log(key);
return 
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
    //         gl: 'us'
    //     }),
    //     new Calculator(),
    // ]


    // const templatePrompt = ChatPromptTemplate.fromPromptMessages([
    //     SystemMessagePromptTemplate.fromTemplate(
    //         "You are a helpful geographic assistant that helps with geo locations of a place.  If the information is not enough just answer, that there is not enough information"
    //     ),
    //     HumanMessagePromptTemplate.fromTemplate(`Extracts the name of the place and return the geographic coordinates of the place from the following phrase: {message}`),
    // ]);

    // // const res = await chain.call({
    // //     message: message,
    // // })

    // const chain = new LLMChain({
    //     llm: model,
    //     prompt: templatePrompt,
    // })

    // const executor = await initializeAgentExecutorWithOptions(tools, model, {
    //     agentType: "chat-conversational-react-description",
    //     verbose: true,
    // })

    // const response = await executor.call({ input: event.target });

    // // const response = await model.call([
    // //     new HumanChatMessage(
    // //         `answer with 3 sentances in the following message in the language of the prompt: ${message}`
    // //     ),
    // // ]);

    // try {
        

    //     return {
    //         statusCode: 200,
    //         body: JSON.stringify({
    //            response:response
    //         }),
    //     };
    // } catch (error) {
    //     console.log('Error!!!!');
    //     return {
    //         statusCode: 400,
    //         body: JSON.stringify({ error }),
    //     };
    // }
}
