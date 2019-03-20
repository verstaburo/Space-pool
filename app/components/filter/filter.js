const $ = window.$;

export default function desktopFilter() {
  // очистка фильтра
  function reset(form) {
    form[0].reset();
    // сбрасываем селекты
    const selects = $(form).find('select');
    $(selects).each((i, el) => {
      const isChoices = $(el).closest('.choices').length;
      if (isChoices) {
        const selectValue = el.defaultSelectedValue || 'placeholder';
        el.choices.setChoiceByValue(selectValue);
        $(el).trigger('change');
      }
    });
    // сбрасываем ползунок
    const ranges = $(form).find('.js-range');
    $(ranges).each((i, el) => {
      const range = $(el).find('[data-range-container]').get(0);
      range.noUiSlider.updateOptions({
        start: $(el).data('start'),
      });
    });
  }

  $(document).on('click', '.js-simple-reset', (evt) => {
    evt.preventDefault();
    const self = $(evt.target).is('.js-simple-reset') ? $(evt.target) : $(evt.target).closest('.js-simple-reset');
    const formName = $(self).attr('data-target-form');
    const form = $(`[data-form="${formName}"]`);
    reset(form);
  });
}
