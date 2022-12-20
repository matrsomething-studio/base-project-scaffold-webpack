'use strict';

// Lib(s)
import Highway from '@dogstudio/highway';
import gsap, { Quad } from 'gsap';

// Module(s)
import { preloadImages } from '../../modules/media';

// Classes(s)
class MrTransition extends Highway.Transition {
  in({ from, to, done }) {
    window.scrollTo(0, 0);

    Promise.all([preloadImages()]).then(() => {
      const TIMELINE_IN = gsap.timeline({onComplete: done});
      let time = .25;

      from.remove();

      TIMELINE_IN.fromTo(to, {opacity: 0}, {duration: time * 1.25, delay: time,  opacity: 1});
    });    
  }

  out({ from, done }) {
    const TIMELINE_OUT = gsap.timeline({onComplete: done});
    let time = .25;

    TIMELINE_OUT.fromTo(from, {opacity: 1}, {duration: time, opacity: 0}); 
  }
}

export default MrTransition;