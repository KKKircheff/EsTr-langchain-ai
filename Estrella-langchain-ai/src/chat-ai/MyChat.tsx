import { useState } from 'react'
import IntroText from './components/Intro.component-text.tsx'
// import bgSpiralImg from '../assets/spiral.jpg'
import bgSpiralImg from '../assets/honeycomb_small_a.jpeg'
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
                <div style={{ backgroundImage: `url(${bgSpiralImg})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
                     <IntroText />
                </div>  
                <div className='flex flex-col min-h-[50%] text-center justify-center items-center px-[20px]'>
                    <h1 className='text-3xl text-lime-600 mt-8 font-semibold'>Pre-trained AI Assistant</h1>
                    <h2 className='text-lg text-gray-200 my-4 font-semibold'>OpenAI & Langchain & Firebase</h2>
                    <h2 className='text-md text-gray-300 leading-3'>Answer questions over Apple's latest product</h2>
                    <h2 className='text-md text-gray-300'>Vision Pro VR/AR</h2>
                    <p className='textarea-md text-gray-400 leading-5'>Custom pre-trained AI assitant over 1st of July 2023 sources, ready to answer your questions over Apple Vision Pro</p>
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
