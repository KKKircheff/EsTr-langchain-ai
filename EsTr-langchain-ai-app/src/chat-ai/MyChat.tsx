import { useState } from 'react'
import bgSpiralImg from '../assets/spiral.jpg'
import Intro from './components/Intro.component'
import ChatCard from './components/Chat-card.component'
import ChatBaloon from './components/Chat-baloon.component'

const MyChat = () => {
    const [isChatActive, setIsChatActive] = useState(false);
    const [responseMessage, setResponseMessage] = useState<string[]>([]);
    const [message, setMessage] = useState('');


    return (
        <section className='h-[100vh] m-0 p-0 overflow-hidden' style={{ backgroundImage: `url(${bgSpiralImg})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
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
