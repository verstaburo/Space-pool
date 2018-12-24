// https://kingsora.github.io/OverlayScrollbars
import OverlayScrollbars from 'overlayscrollbars';

const $ = window.$;

export default function scrollbar() {
  $('.js-scrollbar').each((i, el) => {
    OverlayScrollbars(el, {
      className: 'os-theme-custom',
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
}
