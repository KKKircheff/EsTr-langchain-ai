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
        <div className='w-[100%] ml-[11vw] max-h-[90vh]'>
            {responseMessage.length
                ? <div className="card w-[86%] max-h-60 sm:max-h-40 overflow-y-scroll lg:card-side card-bordered border-gray-600 my-4 text-gray-200 items-start rounded-md">
                    <div className="card-body text-sm px-2 py-4">
                        {responseMessage.map((item, index) => <p key={index}>{item}</p>)}
                    </div>
                    <div ref={scrollRef}></div>
                </div>
                : null}
        </div>
    )
}
export default ResponseField