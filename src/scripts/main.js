'use strict';

// Style(s)
import '../styles/main.scss';


// Module(s)
import React from 'react';
import ReactDOM from 'react-dom/client';


// Component(s)
import Counter from './components/counter.jsx';


// Utilities
import * as NoJs from './utils/noJS';


// Main
const Main = (function() {
    const bindEvents = () => {
        console.log('Binding events...');
    };

    const renderReact = () => {
        const rootElement = document.getElementById('app');
        const root = ReactDOM.createRoot(rootElement);
        root.render(<Counter />);
    };

    const init = () => {
        NoJs.init();
        bindEvents();
        renderReact();
    };

    return {
        init: init,
        renderReact: renderReact
    };
}());


// Load Scripts
document.addEventListener('readystatechange', e => {
    if (e.target.readyState === 'complete') {
        Main.init();
    }
});