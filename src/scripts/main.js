'use strict';

// Style(s)
import '../styles/main.scss';


// Module(s)
import React from 'react';
import ReactDOM from 'react-dom';

// Component(s)
// import Counter from './components/counter.jsx';

// Utilities
import * as NoJs from './utils/noJS';


// Main
const Main = (function() {

    const bindEvents = () => {
        console.log('Binding events...');
    };

    const init = () => {
        NoJs.init();
        bindEvents();
    };

    return {
        init: init
    };
}());


// Load Scripts
document.addEventListener('readystatechange', e => {
    if (e.target.readyState === 'complete') {
        Main.init();
    }
});