import * as functions from "firebase-functions";
// import {OpenAI} from "langchain/llms/openai";
import {ChatOpenAI} from "langchain/chat_models/openai";
import {LLMChain} from "langchain/chains";
import {
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
  ChatPromptTemplate,
} from "langchain/prompts";
const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "Origin, X-Requested-With, Content-Type, Accept",
};

export const templateCall = functions
  .region("europe-west1")
  .https.onRequest(async (req, res) => {
    const {message} = req.query;
    if (typeof message !== "string") {
      res.status(400).json({
        response:
          "Sorry something went wrong with the type of message. Could you be more specific, please.",
      });
      return;
    }

    const keyOpenAPI = process.env.VITE_OPENAI_API_KEY;

    const model = new ChatOpenAI({
      openAIApiKey: keyOpenAPI,
      modelName: "gpt-3.5-turbo",
      temperature: 0,
    });

    const templatePrompt = ChatPromptTemplate.fromPromptMessages([
      SystemMessagePromptTemplate.fromTemplate(
        "You are a helpful geographic assistant that helps with the approximate geo locations of a town, city or any other geographic place. Your name is Lolita. If you can't find current or previous information about the geo location of the place, than answer there is not enough information"
      ),
      HumanMessagePromptTemplate.fromTemplate(
        "Introduce yourself in the begging, then extract the name of the place from the following phrase: {message} and return the approximate geo location of the extracted place."
      ),
    ]);

    const chain = new LLMChain({
      llm: model,
      prompt: templatePrompt,
    });

    try {
      const response = await chain.call({message});
      res.set(CORS_HEADERS);
      res.status(200).json({
        response,
      });
    } catch (error) {
      res.set(CORS_HEADERS);
      res.status(400).json({
        response: `Sorry something went wrong with this search. Could you be more specific, please. ${error}`,
      });
    }
  });
