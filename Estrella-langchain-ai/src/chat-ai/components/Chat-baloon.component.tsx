import { BsChatRight } from 'react-icons/bs'

type ChatBaloonProps = {
    isChatActive: boolean;
    setIsChatActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatBaloon = ({ isChatActive, setIsChatActive }: ChatBaloonProps) => {
    const handleChat = () => {
        setIsChatActive(!isChatActive);
    }

    return (
        <div className={`button-container absolute bottom-10 right-10  ${isChatActive ? 'hidden' : 'block'}`}>
            <button onClick={handleChat} className='btn btn-md border-none text-[4.5rem] animate-bounce text-lime-500 bg-transparent hover:bg-transparent hover:text-lime-400 '>
                <BsChatRight />
                    {/* <PiChatThin /> */}
                <div className='text-[.7rem] p-0 -ml-[4.5rem] -mt-5 leading-4'>
                    <p>AI</p>
                    <p>Assistant</p>
                </div>

            </button>
        </div>
    )
}

export default ChatBaloon