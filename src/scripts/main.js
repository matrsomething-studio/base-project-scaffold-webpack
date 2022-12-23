'use strict';

// Style(s)
import '../styles/main.scss';


// Module(s)


// Component(s)
import * as ThreeExample from './components/ThreeExample';


// Utilities
import * as NoJs from './utils/noJS';


// Main
const Main = (function() {
    const bindEvents = () => {
        console.log('Binding events...');
    };

    const renderReact = () => {
        console.log('Rendering react components...');
        ThreeExample.init();
    };

    const init = () => {
        console.log('Initializing Main...');
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