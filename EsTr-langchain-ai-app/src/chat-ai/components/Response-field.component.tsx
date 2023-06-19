import { useRef, useEffect } from 'react'

type ResponseProps = {
    responseMessage: string[]
}


const ResponseField = ({ responseMessage }: ResponseProps) => {
    const scrollRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, [responseMessage]);

    return (
        <div className='w-[250px] max-h-[80vh]'>
            {responseMessage.length
                ? <div className=" card max-h-60 sm:max-h-40 overflow-y-scroll card-bordered border-gray-600 my-2 text-gray-200 items-start rounded-md">
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