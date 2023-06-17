import { TfiCommentsSmiley } from 'react-icons/tfi'

type ChatBaloonProps = {
    isChatActive:boolean;
    setIsChatActive:React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatBaloon = ({isChatActive,setIsChatActive}:ChatBaloonProps) => {
    const handleChat = () => {
        setIsChatActive(!isChatActive);
    }

    return (
        <div className={`button-container absolute bottom-10 right-10  ${isChatActive ? 'hidden' : 'block'}`}>
            <button onClick={handleChat} className='btn btn-outline btn-circle btn-md text-[1.5rem] animate-pulse text-amber-100 bg-transparent border-amber-200 hover:border-amber-200 hover:bg-amber-200 hover:text-orange-400 border-[2px] pr-[2px] pt-[2px]'>
                <TfiCommentsSmiley />
            </button>
        </div>
    )
}

export default ChatBaloon