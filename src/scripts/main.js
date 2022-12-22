'use strict';

// Style(s)
import '../styles/main.scss';


// Module(s)
import React from 'react';
import ReactDOM from 'react-dom/client';


// Component(s)
import Counter from './components/counter';


// Utilities
import * as NoJs from './utils/noJS';


// Main
const Main = (function() {
    const bindEvents = () => {
        console.log('Binding events...');
    };

    const renderReact = () => {
        console.log('Rendering react components...');
        const root = ReactDOM.createRoot(document.getElementById('app'));
        root.render(<Counter />);
    };

    const init = () => {
        console.log('Initializing main...');
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
        console.log('Browser is ready...');
        NoJs.init();
        Main.init();
    }
});