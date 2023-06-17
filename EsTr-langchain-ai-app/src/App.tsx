import './App.css'
import { useState, useRef,useEffect} from 'react'
import bgSpiralImg from './assets/spiral.jpg'
import toro from './assets/Toro2i.png'
import { TfiCommentsSmiley } from 'react-icons/tfi'

function App() {
    const [isChatActive, setIsChatActive] = useState(false);
    const [responseMessage, setResponseMessage] = useState<string[]>([]);
    const [message, setMessage] = useState('');

    const inputRef = useRef<HTMLInputElement | null>(null);
    // inputRef.current?.focus();
    const scrollRef = useRef<HTMLInputElement | null>(null);


    const handleChat = () => {
        setIsChatActive(!isChatActive);
    }

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
      };

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setResponseMessage((prevValue) => [...prevValue, message]);
        setResponseMessage((prevValue) => [...prevValue,'some message as response'])
    }
    
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }, [responseMessage]);

    return (
        <main className='h-[100vh] overflow-hidden' style={{ backgroundImage: `url(${bgSpiralImg})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>

            <div className='py-10'>
                <img src={toro} alt="toro" className='animate-logoIn w-[50vw] mx-auto' />
            </div>

            <div className={`main-container py-10 -mt-[45vw] transition-all duration-300 ${isChatActive ? 'ml-0]' : 'ml-[101vw]'}`}>
                <div data-theme='dark' className='card lg:card-side card-bordered border-gray-600 shadow-md shadow-stone-600 w-[80vw] py-4 mx-auto mb-6 text-gray-200 items-center'>

                    <div className="card-body mx-0 py-2 items-center">
                        <h2 className="card-title text-[.8rem] sm:text-[1.2rem] ">OpenAI & Langchain </h2>
                        <p className='text-[.6rem] sm:text-[.8rem]'>First test web-app</p>
                    </div>

                    { responseMessage.length 
                        ?<div className="card w-[86%] max-h-28 overflow-y-scroll lg:card-side card-bordered border-gray-600 my-4 text-gray-200 items-start rounded-md">
                            <div  className="card-body text-sm px-2 py-4">
                                {responseMessage.map((item,index)=><p key={index}>{item}</p>)}
                            </div>
                            <div ref={scrollRef}></div>
                        </div>
                        :null}

                    <form onSubmit={handleSubmit} className="form-control w-[100%] px-[7%]">
                        <input type="text"
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

            <div className={`button-container absolute bottom-10 right-10  ${isChatActive ? 'hidden' : 'block'}`}>
                <button onClick={handleChat} className='btn btn-outline btn-circle btn-md text-[1.5rem] animate-pulse text-amber-100 bg-transparent border-amber-200 hover:border-amber-200 hover:bg-amber-200 hover:text-orange-400 border-[2px] pr-[2px] pt-[2px]'>
                    <TfiCommentsSmiley />
                </button>
            </div>

        </main>
    )
}

export default App
