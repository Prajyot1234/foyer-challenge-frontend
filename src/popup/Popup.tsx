import React, { useEffect, useState } from 'react';
import '../styles/app.css'

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../redux/reducer';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
import Landing from '@components/Landing';

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});

const persistor = persistStore(store);

const Popup: React.FC = () => {

    const [tabSize, setTabSize] = useState({ width: 0, height: 0 });

    const [show, setshow] = useState(true)

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const currentUrl: string = tabs[0].url ? tabs[0].url : "Not a youtube wesbite";
        const youtubeRegex = /^(https?:\/\/)?(www\.)?youtube\.com\/.*/i;
        if (youtubeRegex.test(currentUrl) == false)
            setshow(false)
        else
            setshow(true)
    });

    useEffect(() => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const tabWidth = tabs[0].width;
            const tabHeight = tabs[0].height;

            const popupWidth = tabWidth ? tabWidth * 0.3 : 450;
            const popupHeight = tabHeight ? tabHeight * 1.5 : 600;

            setTabSize({ width: popupWidth, height: popupHeight });
        });
    }, []);

    return (
        <div className='h-[600px] font-mono text-white bg-[#10172A]' style={{ width: `${tabSize.width}px` }}>
            {
                show ?
                    <Provider store={store}>
                        <PersistGate loading={null} persistor={persistor}>
                            <div className="w-full h-full">
                                <Landing />
                            </div>
                        </PersistGate>
                    </Provider>
                    :
                    <div className='w-full h-full grid place-items-center hover:cursor-pointer'>
                        <div className='flex flex-col'>
                            <img height={150} width={150} className='mx-auto my-5' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO1nGD6js_J-5HkZr7Ubd0_UX_DCuul6A3Rbq1bfyzTg&s" alt="merlin logo" />
                            <p className='text-3xl font-semibold'>NOT A YOUTUBE PAGE</p>
                        </div>
                    </div>
            }
        </div>
    );
};

export default Popup;
