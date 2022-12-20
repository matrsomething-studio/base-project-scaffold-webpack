'use strict';

import '../styles/main.scss';
import 'bootstrap';

// Module(s)
import * as NoJs from './modules/noJS';


// Component(s)


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