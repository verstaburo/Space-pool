import detectIt from 'detect-it';

const $ = window.$;

if (navigator.userAgent.indexOf('MSIE') !== -1 ||
  navigator.appVersion.indexOf('Trident/') > -1) {
  $('body').addClass('is-IE');
}

if (detectIt.hasTouch) {
  $('body').addClass('is-touched-device');
}

if (navigator.userAgent.indexOf('Edge') !== -1) {
  $('body').addClass('is-Edge');
}
