import {
  freeze,
  unfreeze,
}
from '../../scripts/functions/freeze';

const $ = window.$;

export default function header() {
  // открываем/закрываем навигацию
  const mainNavigation = {
    open(position) {
      freeze();
      $('body').addClass(`is-navigation-open is-navigation-open_${position}`);
    },
    close() {
      $('body').removeClass('is-navigation-open is-navigation-open_bottom is-navigation-open_top');
      unfreeze();
    },
    isActive() {
      return $('body').hasClass('is-navigation-open');
    },
  };

  $(document).on('click', '.js-open-navigation', (evt) => {
    const self = evt.currentTarget;
    const position = $(self).attr('data-menu-position');
    if (mainNavigation.isActive()) {
      mainNavigation.close();
    } else {
      mainNavigation.open(position);
    }
  });

  $(document).on('click', '.overlay', () => {
    mainNavigation.close();
  });

  $(document).on('click', (evt) => {
    const self = evt.target;
    if ($(self).closest('.nd-main-menu').length === 0 && $(self).closest('.js-open-navigation').length === 0 && $(self).not('.js-open-navigation')) {
      mainNavigation.close();
    }
  });

  $(document).on('click', '.js-show-notices', () => {
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
        setTimeout(() => {
          $('body').trigger('HEADER_SHORT_ON');
        }, 50);
      } else {
        $('.page').removeClass('is-short');
        $('.header').removeClass('is-short');
        $('.main-menu').removeClass('is-short');
        setTimeout(() => {
          $('body').trigger('HEADER_SHORT_OFF');
        }, 50);
      }
    }
  }

  headerStyle();
  $(window).on('scroll', headerStyle);
}
