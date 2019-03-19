import {
  freeze,
  unfreeze,
} from '../../blocks/js-functions/freeze';

const $ = window.$;

export default function toggleFilter() {
  // show advanced filter is-fitler-active
  const showFilter = {
    open(target) {
      freeze();
      $('.js-show-advanced-filter').removeClass('is-active');
      const targetBlock = $(`[data-filter="${target}"]`);
      const container = $(targetBlock).closest('[data-filter-container]');
      $(container).addClass('is-filter-active');
      $(targetBlock).addClass('is-active');
      $(`.js-show-advanced-filter[data-target-filter="${target}"]`).addClass('is-active');
    },
    close() {
      unfreeze();
      $('.js-show-advanced-filter').removeClass('is-active');
      const container = $('[data-filter-container]');
      const targetBlocks = $('[data-filter]');
      $(container).removeClass('is-filter-active');
      $(targetBlocks).removeClass('is-active');
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
}
