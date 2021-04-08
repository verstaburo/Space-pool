import {
  primaryInput,
} from 'detect-it';

const {
  $,
} = window;

// eslint-disable-next-line operator-linebreak
if (navigator.userAgent.indexOf('MSIE') !== -1 ||
  navigator.appVersion.indexOf('Trident/') > -1) {
  $('body').addClass('is-IE');
}

if (primaryInput === 'touch') {
  $('body').addClass('is-touched-device');
}

if (navigator.userAgent.indexOf('Edge') !== -1) {
  $('body').addClass('is-Edge');
}

if ('webkitLineClamp' in document.body.style) {
  $('body').addClass('css-line-clamp');
} else if ('lineClamp' in document.body.style) {
  $('body').addClass('css-line-clamp');
} else {
  $('body').addClass('no-css-line-clamp');
}
