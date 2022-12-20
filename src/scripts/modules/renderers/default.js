'use strict';

// Lib(s)
import Highway from '@dogstudio/highway';
import LocomotiveScroll from 'locomotive-scroll';

// Module(s)
import { isTouchEnabled } from '../../modules/noJS';

// Util(s)


// Classes(s)
class MrRenderer extends Highway.Renderer {
  onEnter() {}

  onLeave() {}

  onEnterCompleted() {
    const HAS_TOUCH = isTouchEnabled();
    
    this.loco = new LocomotiveScroll({
      el: document.querySelector('[data-scroll-container]'),
      smooth: true,
      tablet: {
        smooth: (HAS_TOUCH) ? false : true
      },
      smartphone: {
        smooth: (HAS_TOUCH) ? false : true
      }
    });

    this.loco.update();  
  }

  onLeaveCompleted() {
    this.loco.destroy();
  }
}

export default MrRenderer;