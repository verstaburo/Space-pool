const $ = window.$;

if (navigator.userAgent.indexOf('MSIE') !== -1 ||
  navigator.appVersion.indexOf('Trident/') > -1) {
  $('body').addClass('is-IE');
}
