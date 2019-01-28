const $ = window.$;

export default function formManipulations() {
  // активируме скрытую панель при изменении формы
  const formWithHiddenPanel = $('.js-form-with-hidden-panel');

  if ($(formWithHiddenPanel).length > 0) {
    $(document).on('change', '.js-form-with-hidden-panel input, .js-form-with-hidden-panel textarea, .js-form-with-hidden-panel select', (evt) => {
      const self = evt.target;
      const form = $(self).closest('form');
      const panel = $(form).find('[data-hidden-panel]');
      $(panel).addClass('is-active');
    });
  }

  // сбрасываем форму
  function resetForm(form) {
    form[0].reset();
    const selects = $(form).find('select');
    $(selects).each((i, el) => {
      const isChoices = $(el).closest('.choices').length;
      const selectValue = el.defaultSelectedValue;
      if (isChoices) {
        el.choices.setChoiceByValue(selectValue);
        $(el).trigger('change');
      }
    });
    // window.setPasswordMask();
    window.setLabelPosition();
  }

  $(document).on('click', '.js-form-reset', (evt) => {
    evt.preventDefault();
    const self = $(evt.target).closest('form');
    resetForm(self);
  });

  $(document).on('click', '.js-hide-form-panel', (evt) => {
    const form = $(evt.target).closest('form');
    const panel = $(form).find('[data-hidden-panel]');
    $(panel).removeClass('is-active');
  });
}