import { ChatOpenAI } from 'langchain/chat_models/openai';
import { BraveSearch } from 'langchain/tools';

import { Calculator } from 'langchain/tools/calculator';
import { ChatAgent, AgentExecutor } from 'langchain/agents';

exports.handler = async function(event) {

    return {
        statusCode: 200,
        body: JSON.stringify({message: "Hello World"})
    };
}