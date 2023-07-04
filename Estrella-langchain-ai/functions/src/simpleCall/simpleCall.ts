import * as functions from "firebase-functions";
import {ChatOpenAI} from "langchain/chat_models/openai";
// import {BraveSearch} from "langchain/tools";
import {SerpAPI} from "langchain/tools";
import {Calculator} from "langchain/tools/calculator";
import {initializeAgentExecutorWithOptions} from "langchain/agents";

// const CORS_HEADERS = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Headers":
//     "Origin, X-Requested-With, Content-Type, Accept",
// };

export const simpleCall = functions
  .region("europe-west1")
  .https.onRequest(async (req, res) => {
    const {message} = req.query;
    if (typeof message !== "string") {
      res.status(400).json({
        response: "Sorry something went wrong with the type of message. Could you be more specific, please.",
      });
      return;
    }

    const keySerp = process.env.VITE_SERP_API;
    const keyOpenAPI = process.env.VITE_OPENAI_API_KEY;
    // const keyBrave = process.env.VITE_BRAVE_API;

    const model = new ChatOpenAI({
      openAIApiKey: keyOpenAPI,
      modelName: "gpt-3.5-turbo",
      temperature: 0,
      verbose: true,
    });

    const tools = [
      new SerpAPI(keySerp, {
        hl: "en",
      }),
      //   new BraveSearch({
      //     apiKey: keyBrave,
      //   }),
      new Calculator(),
    ];

    const executor = await initializeAgentExecutorWithOptions(tools, model, {
      agentType: "chat-zero-shot-react-description",
      verbose: true,
    });

    const input = message;

    try {
      const response = await executor.call({input});
      //   res.set(CORS_HEADERS);
      res.status(200).json({response});
    } catch (error) {
    //   res.set(CORS_HEADERS);
      res.status(400).json({
        response: `Sorry, something went wrong with this search.
      I tried hard but could not find a proper result. ${error}`,
      });
    }
  });
