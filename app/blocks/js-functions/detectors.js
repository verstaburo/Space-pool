const $ = window.$;

if (navigator.userAgent.indexOf('MSIE') !== -1 ||
  navigator.appVersion.indexOf('Trident/') > -1) {
  $('body').addClass('is-IE');
}

function setDevice() {
  $(document).find('meta[name="viewport"]').attr('content', 'width=device-width, initial-scale=1, maximum-scale=1, minimal-ui');
  if (window.Modernizr.mq(`(max-width: ${window.globalOptions.sizes.sm - 1}px)`)) {
    $(document).find('meta[name="viewport"]').attr('content', 'width=320');
  }
}

setDevice();

$(window).on('resize', setDevice);
