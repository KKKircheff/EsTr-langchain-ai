import { useRef } from "react";
import ResponseField from "./Response-field.component"

import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanChatMessage } from "langchain/schema"; /* send puur messages */
import { SystemMessagePromptTemplate, HumanMessagePromptTemplate, ChatPromptTemplate } from "langchain/prompts";

type ChatCardProps = {
    message: string;
    responseMessage: string[];
    setMessage: React.Dispatch<React.SetStateAction<string>>;
    setResponseMessage: React.Dispatch<React.SetStateAction<string[]>>;
    isChatActive: boolean;
    setIsChatActive: React.Dispatch<React.SetStateAction<boolean>>;
}


const ChatCard = ({ message, responseMessage, setMessage, setResponseMessage, isChatActive, setIsChatActive }: ChatCardProps) => {
    const key = import.meta.env.VITE_OPENAI_API_KEY
    const model = new ChatOpenAI({
        openAIApiKey:key,
        modelName: 'gpt-3.5-turbo',
        temperature: 0,
        verbose: true,
    });

    const inputRef = useRef<HTMLInputElement | null>(null);
    // inputRef.current?.focus();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };

    const simpleCall = async (message: string)=> {
       const response = model.call([
            new HumanChatMessage(
                message
            ),
        ]);
        return response;
    }

    

    const templateCall = async(message:string) => {
        const templatePrompt = ChatPromptTemplate.fromPromptMessages([
            SystemMessagePromptTemplate.fromTemplate(
              "You are a helpful geographic assistant that helps with places geo locations. If the information is not enough just answer there is not enough information"
            ),
            HumanMessagePromptTemplate.fromTemplate(`Extracts the name of the place and return the geographic coordinates of the place from the following phrase: {message}`),
          ]);

       const response = model.generatePrompt([
            await templatePrompt.formatPromptValue({
              message: message,
            }),
          ]);
          return response
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (message.slice(0,7)==='code123'){
            console.log('message in:', message)
            const response = await simpleCall(message);
            setResponseMessage((prevValue) => [...prevValue, message]);
            setMessage('');
            setResponseMessage((prevValue) => [...prevValue, response.text])
            return
        }
        console.log('message out:', message)
        console.log('model:', model)
        const res = await templateCall(message);
        setResponseMessage((prevValue) => [...prevValue, message]);
        const response = res.generations[0][0].text;
        setMessage('');
        setResponseMessage((prevValue) => [...prevValue, response])
    }

    const handleChat = () => {
        setIsChatActive(!isChatActive);
        setResponseMessage([]);
        setMessage('');
    }

    return (
        <div className={`main-container 
                         fixed
                         top-[50vw]
                         -mt-[45vw]
                         transition-all 
                         duration-300 
                         ${isChatActive ? 'ml-[10vw]' : 'ml-[101vw]'}`
        }>
            <div data-theme='dark'
                className='card lg:card-side card-bordered border-gray-600 shadow-md shadow-stone-600 w-[80vw] py-4 mx-auto mb-6 text-gray-200 items-center'>
                <div className="card-body mx-0 py-2 items-center">
                    <h2 className="card-title text-[.8rem] sm:text-[1.2rem] ">OpenAI & Langchain </h2>
                    <p className='text-[.6rem] sm:text-[.8rem]'>First test web-app</p>
                </div>

                <ResponseField responseMessage={responseMessage} />

                <form onSubmit={handleSubmit} className="form-control w-[100%] px-[7%]">
                    <input type="text"
                        required
                        placeholder="your message"
                        className="input w-[100%] text-sm input-sm border-yellow-500 border-[1px]"
                        value={message}
                        onChange={handleInputChange}
                        ref={inputRef}
                    />
                    <div className='flex flex-row px-0 mx-0 gap-4 mt-6 justify-center'>
                        <button type='submit' className='btn btn-sm w-[20vw] btn-warning text-sm text-gray-100'>Send message</button>
                        <button type='button' className='btn btn-sm w-[20vw] btn-error text-sm text-gray-100' onClick={handleChat}>clear chat</button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default ChatCard