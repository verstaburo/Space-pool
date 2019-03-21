const $ = window.$;

export default function advancedFilter() {
  function weightGet(fltr) {
    const filter = fltr;
    const filterEl = $(`[data-filter="${filter}"]`);
    const weightsEl = $(filterEl).find('[data-current-weight]');
    const counter = $(`[data-counter-for-filter="${filter}"]`);
    const weights = [];
    const mobileReset = $('[data-mobile-hidden-reset]');
    $(weightsEl).each((i, el) => {
      weights.push(parseInt($(el).attr('data-current-weight'), 10));
    });
    const totalWeight = weights.reduce((sum, current) =>
      (sum + current), 0);
    $(counter).text(totalWeight);
    if (totalWeight > 0) {
      $(counter).addClass('is-selected');
      $(mobileReset).addClass('is-visible');
    } else {
      $(counter).removeClass('is-selected');
      $(mobileReset).removeClass('is-visible');
    }
  }

  function resetWeight(fltr) {
    const filter = fltr;
    const filterEl = $(`[data-filter="${filter}"]`);
    const weightsEl = $(filterEl).find('[data-current-weight]');
    const counter = $(`[data-counter-for-filter="${filter}"]`);
    const mobileReset = $('[data-mobile-hidden-reset]');
    $(weightsEl).each((i, el) => {
      $(el).attr('data-current-weight', 0);
    });
    $(counter).text('0');
    $(counter).removeClass('is-selected');
    $(mobileReset).removeClass('is-visible');
  }

  $(document).on('change', '[data-filter] input, [data-filter] select', (evt) => {
    const self = evt.currentTarget;
    if ($(self).attr('type') === 'radio' || $(self).attr('type') === 'checkbox') {
      const weightEl = $(self).closest('[data-current-weight]');
      const filter = $(weightEl).attr('data-weight-for-filter');
      if ($(weightEl).find('input:checked').length > 0) {
        $(weightEl).attr('data-current-weight', '1');
      } else {
        $(weightEl).attr('data-current-weight', '0');
      }
      weightGet(filter);
    } else if ($(self).val().length > 0) {
      const weightEl = $(self).closest('[data-current-weight]');
      $(weightEl).attr('data-current-weight', '1');
      const filter = $(weightEl).attr('data-weight-for-filter');
      weightGet(filter);
    } else {
      const weightEl = $(self).closest('[data-current-weight]');
      $(weightEl).attr('data-current-weight', '0');
      const filter = $(weightEl).attr('data-weight-for-filter');
      weightGet(filter);
    }
  });

  $(document).on('click', '[data-reset-weights-for-filter]', (evt) => {
    const self = evt.currentTarget;
    const filter = $(self).attr('data-reset-weights-for-filter');
    resetWeight(filter);
  });
}
