import { BsChatDots } from 'react-icons/bs'

type ChatBaloonProps = {
    isChatActive: boolean;
    setIsChatActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatBaloon = ({ isChatActive, setIsChatActive }: ChatBaloonProps) => {
    const handleChat = () => {
        setIsChatActive(!isChatActive);
    }

    return (
        <div className={`button-container fixed bottom-[40px] right-6 ${isChatActive ? 'hidden' : 'block'}`}>
            <button onClick={handleChat} className='btn btn-sm w-[120px] py-1 px-1 my-0 bg-black bg-opacity-50 border-lime-500 text-[4.5rem] animate-bounce text-lime-500 hover:bg-black hover:opacity-80 hover:text-lime-400 hover:border-lime-400'>
                <div className='flex flex-row justify-around text-[.7rem] p-0 m-0 leading-3'>
                    <p className='mx-1 mt-1'>AI assistant </p>
                    <p className='mx-1 mt-0 text-lg'><BsChatDots /></p>
                </div>

            </button>
        </div>
    )
}

export default ChatBaloon