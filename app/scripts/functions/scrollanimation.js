/* eslint-disable no-unused-vars */
// https://github.com/jlmakes/scrollreveal
import ScrollReveal from 'scrollreveal';

const $ = window.$;

export default function scrollanimation() {
  // Стандартные настройки
  const sr = {
    origin: 'bottom',
    reset: false,
    mobile: true,
    scale: 1,
    delay: 50,
    distance: 0,
    easing: 'cubic-bezier(0.6, 0.2, 0.1, 1)',
    duration: 500,
    interval: 100,
  };

  const sr1 = {
    origin: 'bottom',
    reset: false,
    mobile: true,
    scale: 1,
    delay: 100,
    distance: '80px',
    easing: 'cubic-bezier(0.6, 0.2, 0.1, 1)',
    duration: 500,
    interval: 100,
  };

  const sr2 = {
    origin: 'top',
    reset: false,
    mobile: true,
    scale: 1,
    delay: 100,
    distance: '80px',
    easing: 'cubic-bezier(0.6, 0.2, 0.1, 1)',
    duration: 500,
    interval: 100,
  };

  const sr3 = {
    origin: 'left',
    reset: false,
    mobile: true,
    scale: 1,
    delay: 100,
    distance: '80px',
    easing: 'cubic-bezier(0.6, 0.2, 0.1, 1)',
    duration: 500,
    interval: 100,
  };

  const sr4 = {
    origin: 'right',
    reset: false,
    mobile: true,
    scale: 1,
    delay: 100,
    distance: '80px',
    easing: 'cubic-bezier(0.6, 0.2, 0.1, 1)',
    duration: 500,
    interval: 100,
  };

  const sr5 = {
    origin: 'bottom',
    reset: false,
    mobile: true,
    scale: 1,
    delay: 100,
    distance: '20px',
    easing: 'cubic-bezier(.18,.51,.28,.95)',
    duration: 500,
    interval: 100,
  };

  if ($('.js-sr_opacity').length) {
    ScrollReveal().reveal('.js-sr_opacity', sr);
  }

  if ($('.js-sr_bottom').length) {
    ScrollReveal().reveal('.js-sr_bottom', sr1);
  }

  if ($('.js-sr_top').length) {
    ScrollReveal().reveal('.js-sr_top', sr2);
  }

  if ($('.js-sr_left').length) {
    ScrollReveal().reveal('.js-sr_left', sr3);
  }

  if ($('.js-sr_right').length) {
    ScrollReveal().reveal('.js-sr_right', sr4);
  }

  if ($('.js-sr_bottom-slow').length) {
    ScrollReveal().reveal('.js-sr_bottom-slow', sr5);
  }

  // Показываем элементы, если ScrollReveal не поддерживается
  if (!ScrollReveal().noop) {
    $(document).find('.js-sr').removeClass('.js-sr');
  }
}
/* eslint-enable no-unused-vars */
