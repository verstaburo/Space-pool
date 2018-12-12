const $ = window.$;

const freeze = function () {
  const h = $('html');

  if (h.css('position') !== 'fixed') {
    const top = h.scrollTop() ? h.scrollTop() : $('body').scrollTop();

    if (window.innerWidth > h.width()) {
      h.css('overflow-y', 'scroll');
    }

    h.css({
      width: '100%',
      height: '100%',
      position: 'fixed',
      top: -top,
    });
  }
};

const unfreeze = function () {
  const h = $('html');

  if (h.css('position') === 'fixed') {
    h.css('position', 'static');

    $('html, body').scrollTop(-parseInt(h.css('top'), 10));
    h.css({
      position: '',
      width: '',
      height: '',
      top: '',
      'overflow-y': '',
    });
  }
};

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
