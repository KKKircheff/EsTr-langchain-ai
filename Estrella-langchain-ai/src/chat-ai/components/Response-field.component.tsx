import { useRef, useEffect } from 'react'

type ResponseProps = {
    responseMessage: string[]
    isFocused:boolean
}


const ResponseField = ({ responseMessage, isFocused}: ResponseProps) => {
    const scrollRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, [responseMessage,isFocused]);

    return (
        <div className='w-[230px] max-h-[80vh] -ml-5 mt-1 md:w-[500px] md:-ml-7'>
            {responseMessage.length
                ? <div className={`card ${isFocused ? 'max-h-32':'max-h-96'} md:max-h-[70vh] overflow-y-scroll card-bordered border-gray-600 my-2 text-gray-200 items-start rounded-md`}>
                    <div className="card-body text-[.8rem] mx-0 p-2">
                        {responseMessage.map((item, index) => {
                            const color = index % 2 == 0 ? 'text-lime-400' : 'text-amber-100'
                            return <p key={index} className={color}>{item}</p>
                        }
                        )}
                    </div>
                    <div ref={scrollRef}></div>
                </div>
                : null}
        </div>
    )
}
export default ResponseField