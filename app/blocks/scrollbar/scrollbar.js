// https://kingsora.github.io/OverlayScrollbars
import OverlayScrollbars from 'overlayscrollbars';
import 'os-scroll-chain';

const $ = window.$;

export default function scrollbar() {
  function getScrollInstance(el) {
    return OverlayScrollbars(el);
  }

  window.globalFunctions.getScrollInstance = getScrollInstance;

  function scrollbarS(el) {
    OverlayScrollbars(el, {
      className: 'os-theme-custom',
    });
  }

  window.globalFunctions.scrollbarS = scrollbarS;

  $('.js-scrollbar').each((i, el) => {
    scrollbarS(el);
  });

  function scrollbarThin(el) {
    OverlayScrollbars(el, {
      className: 'os-theme-custom-thin',
    });
  }
  window.globalFunctions.scrollbarThin = scrollbarThin;

  $('.js-scrollbar-thin').each((i, el) => {
    scrollbarThin(el);
  });

  function scrollbarBold(el) {
    OverlayScrollbars(el, {
      className: 'os-theme-custom-bold',
    });
  }
  window.globalFunctions.scrollbarBold = scrollbarBold;

  $('.js-scrollbar-bold').each((i, el) => {
    scrollbarThin(el);
  });

  function scrollbarDark(el) {
    OverlayScrollbars(el, {
      className: 'os-theme-custom-dark',
    });
  }
  window.globalFunctions.scrollbarDark = scrollbarDark;

  $('.js-scrollbar-dark').each((i, el) => {
    scrollbarDark(el);
  });

  function scrollbarLight(el) {
    OverlayScrollbars(el, {
      className: 'os-theme-custom-light',
    });
  }
  window.globalFunctions.scrollbarLight = scrollbarLight;

  $('.js-scrollbar-light').each((i, el) => {
    scrollbarLight(el);
  });

  function scrollbarLightGray(el) {
    OverlayScrollbars(el, {
      className: 'os-theme-custom-light-gray',
    });
  }
  window.globalFunctions.scrollbarLightGray = scrollbarLightGray;

  $('.js-scrollbar-light-gray').each((i, el) => {
    scrollbarLightGray(el);
  });

  function scrollbarWide(el) {
    OverlayScrollbars(el, {
      className: 'os-theme-custom-wide',
    });
  }
  window.globalFunctions.scrollbarWide = scrollbarWide;

  $('.js-scrollbar-wide').each((i, el) => {
    scrollbarWide(el);
  });

  function scrollbarLightOnlyMd(el) {
    const instance = OverlayScrollbars(el);
    if (instance === undefined) {
      if (window.Modernizr.mq(`(max-width: ${window.globalOptions.sizes.md - 1}px)`)) {
        OverlayScrollbars(el, {
          className: 'os-theme-custom-light',
        });
      }
    } else if (window.Modernizr.mq(`(min-width: ${window.globalOptions.sizes.md}px)`)) {
      instance.destroy();
    }
  }
  window.globalFunctions.scrollbarLightOnlyMd = scrollbarLightOnlyMd;

  $('.js-scrollbar-light-md').each((i, el) => {
    scrollbarLightOnlyMd(el);
  });

  $(window).on('resize', () => {
    $('.js-scrollbar-light-md').each((i, el) => {
      scrollbarLightOnlyMd(el);
    });
  });
}
