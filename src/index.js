import React from 'react';
import { render } from 'react-snapshot';
import App from './components/App';
import './index.scss';
import { register } from './serviceWorker';

const rootElement = document.getElementById('root');

render(<App />, rootElement);

register();