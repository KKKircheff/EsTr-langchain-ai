import { useState } from 'react'
import IntroText from './components/Intro.component-text.tsx'
// import bgSpiralImg from '../assets/spiral.jpg'
import bgSpiralImg from '../assets/honeycomb_square.webp'
// import Intro from './components/Intro.component.tsx'
import ChatCard from './components/Chat-card.component.tsx'
import ChatBaloon from './components/Chat-baloon.component.tsx'

const MyChat = () => {
    const [isChatActive, setIsChatActive] = useState(false);
    const [responseMessage, setResponseMessage] = useState<string[]>([]);
    const [message, setMessage] = useState('');


    return (
        <section className='m-0 p-0 overflow-hidden' >
            <div className='grid md:grid-cols-2'>  
                <div style={{ backgroundImage: `url(${bgSpiralImg})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition:'right'}} className='h-[100vw] md:h-[100%]'>
                    <div className='mt-[25vw] md:mt-0'> 
                        <IntroText />
                    </div>
                    
                </div>  
                <div className='flex flex-col min-h-[400px] text-center justify-center items-center px-[20px] md:px-[40px] font-poppins'>
                    <h2 className='text-md text-gray-400 mb-2 mt-8 font-semibold'>OpenAI, Langchain & Firebase</h2>
                    <h1 className='font-poppins text-2xl text-lime-600 my-2 font-bold'>Pre-trained AI Assistant</h1>
                    <h2 className='text-sm text-lime-700 leading-6'>Answers questions about new Apple's</h2>
                    <h2 className='text-sm text-lime-700 leading-6'>Vision Pro VR/AR</h2>
                    <p className='text-sm my-5 text-gray-400 leading-5 text-justify'>Custom pre-trained AI assistant. As it's a simple demo, there is no memory integration. That means the AI assistand does not remember any previous chat prompts and questions. Some other interesting integrations on the way! The actual embeddings from the documentation were created on July 1, 2023.</p>
                    <p className='text-sm mt-0 mb-5 text-gray-400 leading-5 text-left'> It's ready to answer your questions about Apple Vision Pro in your own language</p>
                    <p className='text-xs my-1 text-gray-400 leading-3'>Apple's Vision Pro page:</p>
                    <p className='text-xs my-1 text-gray-400 leading-3 mb-48 md:mb-2'>https://www.apple.com/apple-vision-pro/</p>
                    <p className='text-xs my-1 text-gray-400 leading-3 mt-6'>Estrella Toro web AI 2023 </p>
                </div> 
            </div>
            
            <ChatCard
                responseMessage={responseMessage}
                setResponseMessage={setResponseMessage}
                message={message}
                setMessage={setMessage}
                isChatActive={isChatActive}
                setIsChatActive={setIsChatActive}
            />
            <ChatBaloon isChatActive={isChatActive} setIsChatActive={setIsChatActive} />
        </section>
    )
}

export default MyChat
