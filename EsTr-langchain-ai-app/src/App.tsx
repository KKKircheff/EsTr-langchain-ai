import './App.css'

function App() {

    return (
        <main>

            <div data-theme='dark' className="card lg:card-side card-bordered shadow-lg w-80 py-4 mx-auto mb-10 text-gray-200 items-center">
                <div className="card-body items-start mx-0 py-2">
                    <h2 className="card-title text-base">OpenAI & Langchain with TS</h2>
                    <p className='text-base'>First test web-app</p>
                </div>



                <div className="form-control w-72">
                    <label className="label text-sm">
                        <span className="label-text text-sm">AI message</span>
                    </label>
                    <input type="text" placeholder="your message" className="text-sm input-xs input-primary input-bordered" />
                </div>
                <div className='flex flex-row gap-8 mt-6'>
                    <button className='btn btn-sm btn-warning text-sm text-gray-200'>Let's talk</button>
                    <button className='btn btn-sm btn-error text-sm text-gray-200'>clear chat</button>
                </div>
            </div>
        </main>
    )
}

export default App
