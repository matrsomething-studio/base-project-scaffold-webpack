'use strict';

// Style(s)
import '../styles/main.scss';


// Component(s)


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