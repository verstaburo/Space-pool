const $ = window.$;

export default function desktopFilter() {
  // очистка фильтра
  function reset(form) {
    form[0].reset();
    const selects = $(form).find('select');
    $(selects).each((i, el) => {
      const isChoices = $(el).closest('.choices').length;
      if (isChoices) {
        el.choices.setChoiceByValue('placeholder');
        $(el).trigger('change');
      }
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
