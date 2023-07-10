import React from 'react'

import '../styles/app.css'

import { useDispatch, useSelector } from 'react-redux';
import { activateBtn } from '../redux/reducer';
import Chat from './Chat';

interface State {
    activate: boolean
}

const Landing: React.FC = () => {
    const dispatch = useDispatch();
    const activate = useSelector((state: State) => state.activate);

    const handleActivate = () => {
        dispatch(activateBtn());
    };

    return (
        <div className='w-full h-full flex flex-col'>
            <div className={activate === false ? 'h-full w-full grid place-items-center' : 'w-full grid place-items-center'}>
                <div className='!my-auto text-center'>
                    {
                        activate === false &&
                        <div>
                            <div className='mx-auto text-center'>
                                <img className='mx-auto' height={100} width={100} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO1nGD6js_J-5HkZr7Ubd0_UX_DCuul6A3Rbq1bfyzTg&s" alt="merlin logo" />
                                <p className='text-xl font-bold my-2'>Foyer Assignment Extension</p>
                                <hr className='w-1/3 mx-auto' />
                            </div>
                            <p className='text-base mt-4 font-bold'>Chat with ChatGPT</p>
                            <p className='text-sm w-10/12 mx-auto my-2'>Click on activate button for chatting with chat-GPT.</p>
                        </div>
                    }
                    <button onClick={handleActivate} className='fiveth-button text-xs my-2'>
                        {activate === false ? "Activate" : "Deactivate"} ChatGPT
                    </button>
                </div>
            </div>
            {
                activate &&
                <div className='flex-1 !h-full'>
                    <Chat />
                </div>
            }
        </div>
    )
}

export default Landing