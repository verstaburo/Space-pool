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

function setDevice() {
  if (!$('body').is('.no-js-scale')) {
    $(document).find('meta[name="viewport"]').attr('content', 'width=device-width, initial-scale=1, maximum-scale=1, minimal-ui');
    if (window.Modernizr.mq(`(max-width: ${window.globalOptions.sizes.sm - 1}px)`)) {
      $(document).find('meta[name="viewport"]').attr('content', 'width=320');
    }
  }
}

setDevice();

$(window).on('resize', setDevice);
