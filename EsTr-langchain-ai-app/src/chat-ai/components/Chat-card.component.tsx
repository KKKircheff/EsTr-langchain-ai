import { useRef, useState } from "react";
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
   
    const [isLoading, setIsloading] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const key = import.meta.env.VITE_OPENAI_API_KEY
    const model = new ChatOpenAI({
        openAIApiKey: key,
        modelName: 'gpt-3.5-turbo',
        temperature: 0,
        verbose: true,
    });

    const inputRef = useRef<HTMLInputElement | null>(null);
    // inputRef.current?.focus();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };

    const simpleCall = async (message: string) => {
        const response = model.call([
            new HumanChatMessage(
                `answer with 3 sentances in the following message in the language of the prompt: ${message}`
            ),
        ]);
        return response;
    }



    const templateCall = async (message: string) => {
        const templatePrompt = ChatPromptTemplate.fromPromptMessages([
            SystemMessagePromptTemplate.fromTemplate(
                "You are a helpful geographic assistant that helps with geo locations of a place.  If the information is not enough just answer, that there is not enough information"
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
        setIsFocused(false);
        setIsloading(true);
        if (message.slice(0, 7) === 'code123') {
            const response = await simpleCall(message);
            setResponseMessage((prevValue) => [...prevValue, message]);
            setMessage('');
            setResponseMessage((prevValue) => [...prevValue, response.text])
        setIsloading(false);
            return
        }
        const res = await templateCall(message);
        setResponseMessage((prevValue) => [...prevValue, message]);
        const response = res.generations[0][0].text;
        setMessage('');
        setResponseMessage((prevValue) => [...prevValue, response]);
        setIsloading(false);
    }

    const handleChat = () => {
        setIsChatActive(!isChatActive);
        setResponseMessage([]);
        setMessage('');
    }

    const handleFocus = () => {
        setIsFocused(true);
      };

      const handleBlur = () => {
        // Delay the state update by a short time to allow the form submission to proceed
        setTimeout(() => {
          setIsFocused(false);
        }, 200);
      };
         
    return (
        <div className={`main-container 
                         fixed
                         top-[50vw]
                         -mt-[45vw]
                         transition-all 
                         duration-300 
                         ${isChatActive ? 'ml-[calc(100vw_-_300px)] sm:ml-[calc(100vw_-_320px)]' : 'ml-[101vw]'}`
        }>
            <div data-theme='dark'
                className='card card-bordered border-gray-600 w-[290px] py-2 mb-6 text-gray-200 items-center'>
                <div className="card-body mx-0 py-2 items-center">
                    <p className='text-[.8rem] sm:text-[.8rem] pb-1'>Langchain & OpenAI & Estrella Toro</p>
                </div>

                 <ResponseField responseMessage={responseMessage} isFocused={isFocused}/>

                <form onSubmit={handleSubmit} className="form-control w-[100%] px-[7%]">
                    <input type="text"
                        required
                        placeholder="your message"
                        className="input w-[100%] text-[.8rem] input-sm border-yellow-500 border-[1px]"
                        value={message}
                        onChange={handleInputChange}
                        ref={inputRef}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                    <div className='flex flex-row px-0 mx-0 gap-4 mt-6 justify-center'>
                        {!isLoading && <button type='submit' className='btn btn-sm w-[110px] btn-warning text-sm text-gray-100'>Send message</button>}
                        {isLoading && <button className='btn-disabled btn-sm flex flex-row justify-between items-center w-[110px] text-sm text-gray-100'>
                            <span className="loading loading-spinner"></span>
                            <span>loading...</span>
                        </button>}
                        <button type='button' className='btn btn-sm w-[110px] btn-error text-sm text-gray-100' onClick={handleChat}>clear chat</button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default ChatCard