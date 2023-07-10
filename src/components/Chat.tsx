import React, { useEffect, useRef, useState } from 'react';
import '../styles/app.css'

import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../redux/reducer';

interface Message {
    date: string;
    message: string;
    id: string;
    owner: string;
    error: boolean
}

interface State {
    activate: boolean;
    messages: Message[];
}

function Chat() {

    const [message, setmessage] = useState('');
    //for loader
    const [loading, setloading] = useState(false);

    //form redux store
    const dispatch = useDispatch();
    const messages = useSelector((state: State) => state.messages);

    const handleSubmit = () => {

        let messagePayload = {
            message: message,
            date: new Date().toString(),
            id: Math.random().toString(16).slice(2),
            owner: 'me',
            error: false
        };

        dispatch(sendMessage(messagePayload));

        setloading(true);
        setTimeout(() => {
            fetch('http://localhost:3002/query', {
                method: 'POST',
                body: JSON.stringify({
                    message: message
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
                .then(response => response.json())
                .then(json => {
                    if (json.status == 401) {
                        let payload = {
                            message: 'error fetching data from Chat-GPT',
                            date: new Date().toString(),
                            id: Math.random().toString(16).slice(2),
                            owner: 'chat-gpt',
                            error: true
                        }
                        dispatch(sendMessage(payload));
                    } else {
                        let payload = {
                            message: json.response,
                            date: new Date().toString(),
                            id: Math.random().toString(16).slice(2),
                            owner: 'chat-gpt',
                            error: false
                        }
                        dispatch(sendMessage(payload));
                    }
                    setloading(false);
                }).catch((err) => {
                    let payload = {
                        message: 'error fetching data from Chat-GPT',
                        date: new Date().toString(),
                        id: Math.random().toString(16).slice(2),
                        owner: 'chat-gpt',
                        error: true
                    }
                    dispatch(sendMessage(payload));
                    setloading(false);
                })
        }, 1000);

        setmessage('');
    }


    //for scrolling effect
    const messagesEndRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <div className='w-full h-full flex flex-col'>
            <div className='flex-1 h-full overflow-y-scroll'>
                <div className='h-[460px] overflow-scroll '>
                    {
                        messages.map(message => {
                            console.log(message.error);
                            return (
                                <div key={message.id} className={message.owner == 'me' ? ' flex justify-end text-white w-full' : 'text-white flex w-full'} >
                                    {message.error === true ?
                                        <div className='py-1 px-2 ml-2 rounded my-1 bg-red-400 overflow-scroll !w-fit'>
                                            <p>{message.message}</p>
                                        </div>
                                        :
                                        <div className={message.owner == 'me' ? ' py-1 bg-[#1f2943] mx-2 px-2 overflow-scroll rounded my-1 !w-fit' : 'mx-2 py-1 bg-[#7838E6] overflow-scroll px-2 rounded my-1 !w-fit'}>
                                            <p>{message.message}</p>
                                        </div>
                                    }
                                    <div style={{ float: "left", clear: "both" }}
                                        ref={messagesEndRef}>
                                    </div>
                                </div>
                            )
                        })
                    }
                    {
                        loading &&
                        <section className="mx-2 py-1 bg-[#7838E6] overflow-scroll px-2 rounded my-1 !w-fit">
                            <div className='loader'></div>
                        </section>
                    }
                </div>
            </div>
            <div className='flex w-[95%] px-2 py-2 my-[15px] border rounded-md border-gray-700 mx-auto'>
                <input
                    value={message}
                    onChange={event => { setmessage(event.target.value) }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSubmit();
                        }
                    }}
                    className='flex-1 outline-none bg-[#10172A]'
                    placeholder='Start typing your prompt here ...' />
                <svg onClick={handleSubmit} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[22px] h-[22px] text-gray-400 cursor-pointer hover:text-white hover:transition-all delay-300 ">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
            </div>
        </div>
    )
}

export default Chat