// https://github.com/leongersen/noUiSlider
import noUiSlider from 'nouislider';

const $ = window.$;

export default function sliders() {
  // Параметры берутся из дата-атрибутов
  function rangeInit(rangeEl) {
    const el = $(rangeEl);
    const currency = el.data('currency') || '';
    const margin = el.data('margin') || 0;
    const step = el.data('step') || 1;
    noUiSlider.create(el.find('[data-nd-range-container]').get(0), {
      start: (el.data('start') || [+el.data('min'), +el.data('max')]),
      connect: (el.data('connect') || [false, true, false]),
      step,
      margin,
      range: {
        min: +el.data('min'),
        max: +el.data('max'),
      },
    });

    const range = el.find('[data-nd-range-container]').get(0);
    const output = el.find('[data-nd-range-output]');

    if (output.length > 0) {
      const nodes = [$(el).find('[data-nd-range-min]'), $(el).find('[data-nd-range-max]')];
      range.noUiSlider.on('update', (values, handle) => {
        nodes[handle].text(`${currency} ${parseInt(values[handle], 10)}`);
      });
    }

    const inputs = [$(el).find('[data-nd-range-input-min]'), $(el).find('[data-nd-range-input-max]')];
    range.noUiSlider.on('update', (values, handle) => {
      inputs[handle].val(`${currency} ${parseInt(values[handle], 10)}`);
      inputs[handle].trigger('change');
    });

    $(document).on('blur', '[data-nd-range-input-min], [data-nd-range-input-max]', (evt) => {
      const self = evt.currentTarget;
      const rng = $(self).closest('.js-nd-range');
      const sldr = $(rng).find('[data-nd-range-container]').get(0);
      const minInput = $(rng).find('[data-nd-range-input-min]');
      const maxInput = $(rng).find('[data-nd-range-input-max]');
      const minVal = +$(minInput).val().replace(/\D+/g, '') || 0;
      const maxVal = +$(maxInput).val().replace(/\D+/g, '') || minVal;
      sldr.noUiSlider.set([minVal, maxVal]);
    });
  }

  $('.js-nd-range').each((i, el) => {
    rangeInit(el);
  });

  function resetRange(range) {
    range.noUiSlider.reset();
  }

  window.globalFunctions.rangeInit = rangeInit;
  window.globalFunctions.resetRange = resetRange;
}
