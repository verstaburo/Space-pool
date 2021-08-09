/* eslint-disable no-unused-vars */
import $ from 'jquery';

// http://iamceege.github.io/tooltipster/
import tooltipster from 'tooltipster';

export default function tooltips() {
  $('.js-tooltip').tooltipster({
    animation: 'fade',
    delay: 0,
    side: ['top', 'right', 'bottom', 'left'],
    arrow: false,
    distance: 0,
    interactive: true,
    maxWidth: 620,
    theme: 'sp-border',
    trigger: 'custom',
    triggerOpen: {
      mouseenter: true,
      tap: true,
    },
    triggerClose: {
      mouseleave: true,
      originClick: true,
      tap: true,
    },
  });

  $('.js-tooltip-v2').tooltipster({
    animation: 'slide',
    delay: 0,
    side: ['top', 'right', 'bottom', 'left'],
    arrow: false,
    distance: 0,
    interactive: true,
    maxWidth: 620,
    theme: 'sp-dark',
    trigger: 'custom',
    triggerOpen: {
      mouseenter: true,
      tap: true,
    },
    triggerClose: {
      mouseleave: true,
      originClick: true,
      tap: true,
    },
  });
}
/* eslint-enable no-unused-vars */
