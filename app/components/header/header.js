import {
  freeze,
  unfreeze,
} from '../../blocks/js-functions/freeze';

const $ = window.$;

export default function header() {
  // открываем/закрываем навигацию
  const mainNavigation = {
    open() {
      freeze();
      $('body').addClass('is-navigation-open');
    },
    close() {
      $('body').removeClass('is-navigation-open');
      unfreeze();
    },
    isActive() {
      return $('body').hasClass('is-navigation-open');
    },
  };

  $(document).on('click', '.js-open-navigation', () => {
    if (mainNavigation.isActive()) {
      mainNavigation.close();
    } else {
      mainNavigation.open();
    }
  });

  $(document).on('click', '.overlay', () => {
    mainNavigation.close();
  });

  // стилизуем хэдер в зависимости от позиции на странице
  function headerStyle() {
    const sT = $(window).scrollTop();
    let offset = 19;

    if (window.Modernizr.mq(`(max-width: ${window.globalOptions.sizes.md - 1}px)`)) {
      offset = 13;
    }

    if (!$('html').hasClass('freeze')) {
      if (sT > offset) {
        $('.page').addClass('is-short');
        $('.header').addClass('is-short');
        $('.main-menu').addClass('is-short');
      } else {
        $('.page').removeClass('is-short');
        $('.header').removeClass('is-short');
        $('.main-menu').removeClass('is-short');
      }
    }
  }

  headerStyle();
  $(window).on('scroll', headerStyle);
}
