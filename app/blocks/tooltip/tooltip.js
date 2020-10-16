/* eslint-disable no-unused-vars */
import $ from 'jquery';

// http://iamceege.github.io/tooltipster/
import tooltipster from 'tooltipster';

export default function tooltips() {
  $('.js-tooltip').tooltipster({
    animation: 'fade',
    delay: 0,
    side: ['top', 'right', 'bottom', 'left'],
    trigger: 'click',
    arrow: false,
    distance: 0,
    interactive: true,
    maxWidth: 620,
    theme: 'sp-border',
  });
}
/* eslint-enable no-unused-vars */
