// https://kingsora.github.io/OverlayScrollbars
import OverlayScrollbars from 'overlayscrollbars';
import 'os-scroll-chain';

const $ = window.$;

export default function scrollbar() {
  $('.js-scrollbar').each((i, el) => {
    OverlayScrollbars(el, {
      className: 'os-theme-custom',
    });
  });

  $('.js-scrollbar-thin').each((i, el) => {
    OverlayScrollbars(el, {
      className: 'os-theme-custom-thin',
    });
  });

  $('.js-scrollbar-dark').each((i, el) => {
    OverlayScrollbars(el, {
      className: 'os-theme-custom-dark',
    });
  });

  $('.js-scrollbar-light').each((i, el) => {
    OverlayScrollbars(el, {
      className: 'os-theme-custom-light',
    });
  });

  $('.js-scrollbar-light-gray').each((i, el) => {
    OverlayScrollbars(el, {
      className: 'os-theme-custom-light-gray',
    });
  });

  $('.js-scrollbar-wide').each((i, el) => {
    OverlayScrollbars(el, {
      className: 'os-theme-custom-wide',
    });
  });
}
