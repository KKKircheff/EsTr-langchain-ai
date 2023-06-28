import { useState } from 'react'
import bgSpiralImg from '../assets/spiral.jpg'
import Intro from './components/Intro.component.tsx'
import ChatCard from './components/Chat-card.component.tsx'
import ChatBaloon from './components/Chat-baloon.component.tsx'

const MyChat = () => {
    const [isChatActive, setIsChatActive] = useState(false);
    const [responseMessage, setResponseMessage] = useState<string[]>([]);
    const [message, setMessage] = useState('');


    return (
        <section className='m-0 p-0 overflow-hidden' style={{ backgroundImage: `url(${bgSpiralImg})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
            <Intro />
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