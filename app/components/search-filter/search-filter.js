import {
  freeze,
  unfreeze,
}
from '../../scripts/functions/freeze';

const $ = window.$;

export default function toggleFilter() {
  function hideBottomPanel() {
    const sT = $(window).scrollTop();
    const wH = $(window).height();
    const sB = sT + wH;
    const activePopups = $('.is-active[data-filter]');
    $(activePopups).each((i, el) => {
      const elTop = $(el).offset().top;
      const elHeight = $(el).outerHeight();
      const elBottom = (elTop + elHeight);
      if (elBottom > sB) {
        $(el).removeClass('is-absolute-bottom');
      } else {
        $(el).addClass('is-absolute-bottom');
      }
    });
  }

  // show advanced filter is-fitler-active
  const showFilter = {
    open(target) {
      $('.js-show-advanced-filter').removeClass('is-active');
      const targetBlock = $(`[data-filter="${target}"]`);
      const pageMinHeight = $(targetBlock).outerHeight(true) + 200;
      const container = $(targetBlock).closest('[data-filter-container]');
      const isFixed = $(targetBlock).is('[data-md-full]');
      $(container).addClass('is-filter-active');
      $(targetBlock).addClass('is-active');
      $(`.js-show-advanced-filter[data-target-filter="${target}"]`).addClass('is-active');
      $('.page').css({
        'min-height': `${pageMinHeight}px`,
      });
      $('.page').trigger('openSearchFilter');
      if (isFixed && window.Modernizr.mq(`(max-width: ${window.globalOptions.sizes.md - 1}px)`)) {
        freeze();
      }
    },
    close() {
      $('.js-show-advanced-filter').removeClass('is-active');
      const container = $('[data-filter-container]');
      const targetBlocks = $('[data-filter]');
      $(container).removeClass('is-filter-active');
      $(targetBlocks).removeClass('is-active is-absolute-bottom');
      $('.page').css({
        'min-height': 0,
      });
      unfreeze();
    },
    isActive(target) {
      const targetBlock = $(`[data-filter="${target}"]`);
      const container = $(targetBlock).closest('[data-filter-container]');
      return $(container).is('.is-filter-active');
    },
  };

  $(document).on('click', '.js-show-advanced-filter', (evt) => {
    const self = evt.currentTarget;
    const targetBlock = $(self).attr('data-target-filter');
    if (showFilter.isActive(targetBlock)) {
      showFilter.close();
    } else {
      showFilter.open(targetBlock);
    }
  });

  $(document).on('click', '[data-filter-overlay], .js-close-advanced-filter', () => {
    showFilter.close();
  });

  // Следим за низмо попапа
  $(window).on('scroll', hideBottomPanel);
  // setInterval(() => {
  //   if (window.Modernizr.mq(`(max-width: ${window.globalOptions.sizes.md - 1}px)`)) {
  //     hideBottomPanel();
  //   }
  // }, 100);
}
