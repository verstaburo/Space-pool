// https://kingsora.github.io/OverlayScrollbars
import OverlayScrollbars from 'overlayscrollbars';
import 'os-scroll-chain';

const $ = window.$;

export default function scrollbar() {
  function getScrollInstance(el) {
    return OverlayScrollbars(el);
  }

  window.globalFunctions.getScrollInstance = getScrollInstance;

  function scrollbarS(el, isChainBlock) {
    const inst = OverlayScrollbars(el, {
      className: 'os-theme-custom',
    });
    if (isChainBlock) {
      inst.addExt('scroll-chain');
    }
  }

  window.globalFunctions.scrollbarS = scrollbarS;

  $('.js-scrollbar').each((i, el) => {
    scrollbarS(el);
  });

  function scrollbarThin(el, isChainBlock) {
    const inst = OverlayScrollbars(el, {
      className: 'os-theme-custom-thin',
    });
    if (isChainBlock) {
      inst.addExt('scroll-chain');
    }
  }
  window.globalFunctions.scrollbarThin = scrollbarThin;

  $('.js-scrollbar-thin').each((i, el) => {
    scrollbarThin(el);
  });

  function scrollbarBold(el, isChainBlock) {
    const inst = OverlayScrollbars(el, {
      className: 'os-theme-custom-bold',
    });
    if (isChainBlock) {
      inst.addExt('scroll-chain');
    }
  }
  window.globalFunctions.scrollbarBold = scrollbarBold;

  $('.js-scrollbar-bold').each((i, el) => {
    scrollbarThin(el);
  });

  function scrollbarDark(el, isChainBlock) {
    const inst = OverlayScrollbars(el, {
      className: 'os-theme-custom-dark',
    });
    if (isChainBlock) {
      inst.addExt('scroll-chain');
    }
  }
  window.globalFunctions.scrollbarDark = scrollbarDark;

  $('.js-scrollbar-dark').each((i, el) => {
    scrollbarDark(el);
  });

  function scrollbarLight(el, isChainBlock) {
    const inst = OverlayScrollbars(el, {
      className: 'os-theme-custom-light',
    });
    if (isChainBlock) {
      inst.addExt('scroll-chain');
    }
  }
  window.globalFunctions.scrollbarLight = scrollbarLight;

  $('.js-scrollbar-light').each((i, el) => {
    scrollbarLight(el);
  });

  function scrollbarLightGray(el, isChainBlock) {
    const inst = OverlayScrollbars(el, {
      className: 'os-theme-custom-light-gray',
    });
    if (isChainBlock) {
      inst.addExt('scroll-chain');
    }
  }
  window.globalFunctions.scrollbarLightGray = scrollbarLightGray;

  $('.js-scrollbar-light-gray').each((i, el) => {
    scrollbarLightGray(el);
  });

  function scrollbarWide(el, isChainBlock) {
    const inst = OverlayScrollbars(el, {
      className: 'os-theme-custom-wide',
    });
    if (isChainBlock) {
      inst.addExt('scroll-chain');
    }
  }
  window.globalFunctions.scrollbarWide = scrollbarWide;

  $('.js-scrollbar-wide').each((i, el) => {
    scrollbarWide(el);
  });

  function scrollbarLightOnlyMd(el) {
    const instance = OverlayScrollbars(el);
    if (instance === undefined) {
      if (window.Modernizr.mq(`(max-width: ${window.globalOptions.sizes.md - 1}px)`)) {
        const inst = OverlayScrollbars(el, {
          className: 'os-theme-custom-light',
        });
        inst.addExt('scroll-chain');
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
