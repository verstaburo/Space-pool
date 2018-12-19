import {
  freeze,
  unfreeze,
} from '../../blocks/js-functions/freeze';

const $ = window.$;

export default function header() {
  const mainNavigation = {
    open() {
      freeze();
      if ($(window).width() < 768) {
        $('body').addClass('is-navigation-open');
      }
    },
    close() {
      if ($(window).width() < 768) {
        $('body').removeClass('is-navigation-open');
      }
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

  $(window).on('resize', () => {
    if ($(window).width() >= 768) {
      mainNavigation.close();
    }
  });

  function fixHeader() {
    const sT = $(window).scrollTop();
    if (sT > 1) {
      $('.header').addClass('is-fixed');
    } else {
      $('.header').removeClass('is-fixed');
    }
  }

  $(window).on('scroll', fixHeader);
}
