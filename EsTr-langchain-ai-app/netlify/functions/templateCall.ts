// import { ChatOpenAI } from 'langchain/chat_models/openai';
import { OpenAI } from "langchain";
// import { LLMChain } from 'langchain/chains';
// import {
//     SystemMessagePromptTemplate,
//     HumanMessagePromptTemplate,
//     ChatPromptTemplate,
// } from 'langchain/prompts';

const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept',
};

export const handler = async (event) => {

    const message = event.queryStringParameters.parameter;
    const keyOpenAPI = process.env.VITE_OPENAI_API_KEY;


    const model = new OpenAI({
        openAIApiKey: keyOpenAPI,
        modelName: 'gpt-3.5-turbo',
        temperature: 0,
    });

    // const templatePrompt = ChatPromptTemplate.fromPromptMessages([
    //     SystemMessagePromptTemplate.fromTemplate(
    //         'You are a helpful geographic assistant that helps with geo locations of a place. Your name is Lolita. If the information is not enough just answer, that there is not enough information'
    //     ),
    //     HumanMessagePromptTemplate.fromTemplate(
    //         `Extracts the name of the place and return the geographic coordinates of the place from the following phrase: {message}`
    //     ),
    // ]);

    // const chain = new LLMChain({
    //     llm: model,
    //     prompt: templatePrompt,
    // });
    try {
        const asyncResponse = async()=> await model.call(message);
        const response = await asyncResponse();
        return {
            statusCode: 200,
            headers: { ...CORS_HEADERS },
            body: JSON.stringify({
                response: response,
            })
        }
    } catch (error) {
        return {
            statusCode: 400,
            headers: { ...CORS_HEADERS },
            body: JSON.stringify({
                response:
                    `Sorry something went wrong with this search. Could you be more specific, please.${error.name} ${error.message}`,
            }),
        };
    }
}
