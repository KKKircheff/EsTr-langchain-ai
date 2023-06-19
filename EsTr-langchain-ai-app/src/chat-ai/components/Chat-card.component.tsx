import { useRef, useState } from "react";
import ResponseField from "./Response-field.component"
import { BsSend } from 'react-icons/bs';
import { SlClose } from 'react-icons/sl'

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

        if (!message) {
            return
        }

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
                {responseMessage.length
                    ? null
                    : <div className="card-body -ml-5 py-2 items-start">
                        <p className='text-[.8rem] sm:text-[.8rem] pb-1'>Langchain & OpenAI & Estrella Toro</p>
                    </div>}

                <ResponseField responseMessage={responseMessage} isFocused={isFocused} />

                <form onSubmit={handleSubmit} className="flex flex-row items-center form-control w-[90%] ml-3">
                    <input type='text'
                        className="input w-[100%] text-[.8rem] text-gray-300 px-2 py-0 mx-0 my-2 h-8 border-gray-600 border-[1px] focus:border-gray-400 focus:border-[1px] focus:outline-none"
                        maxLength={150}
                        required
                        placeholder="your message"
                        value={message}
                        onChange={handleInputChange}
                        ref={inputRef}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                    {!isLoading && <button type='submit' className='btn btn-sm bg-transparent text-base text-lime-700 -mr-2 hover:bg-transparent hover:border-transparent hover:text-lime-400'><BsSend /></button>}
                    {isLoading && <button className='btn-disabled btn-md flex flex-row justify-between items-center text-gray-100'>
                        <span className="loading loading-spinner"></span>
                    </button>}
                </form>
                <button type='button' className='btn bg-transparent absolute -top-0 right-3 btn-sm text-base text-gray-400 p-0 m-0 hover:bg-transparent hover:text-gray-300' onClick={handleChat}><SlClose /></button>

            </div>
        </div>
    )
}

export default ChatCard