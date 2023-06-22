
import { ChatOpenAI } from "langchain/chat_models/openai";
// import { OpenAI } from "langchain/llms/openai";
import { LLMChain } from "langchain/chains";
import { SystemMessagePromptTemplate, HumanMessagePromptTemplate, ChatPromptTemplate } from "langchain/prompts";
import * as dotenv from 'dotenv';

exports.handler = async (event)=> {


    dotenv.config();

    const keyOpenAPI = process.env.VITE_OPENAI_API_KEY;

    const { message } = JSON.parse(event.body);

    console.log('message',message)
    const model = new ChatOpenAI({
        openAIApiKey: keyOpenAPI,
        modelName: 'gpt-3.5-turbo',
        temperature: 0,
        verbose: true,
    });


    const templatePrompt = ChatPromptTemplate.fromPromptMessages([
        SystemMessagePromptTemplate.fromTemplate(
            "You are a helpful geographic assistant that helps with geo locations of a place.  If the information is not enough just answer, that there is not enough information"
        ),
        HumanMessagePromptTemplate.fromTemplate(`Extracts the name of the place and return the geographic coordinates of the place from the following phrase: {message}`),
    ]);


    const chain = new LLMChain({
        llm: model,
        prompt: templatePrompt,
    })

    try {

        const response = await chain.call({
            message: message,
        })

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
