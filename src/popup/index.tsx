import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { browser } from 'webextension-polyfill-ts';

import Popup from './Popup';
import '../styles/app.css';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('popup');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(<Popup />);
