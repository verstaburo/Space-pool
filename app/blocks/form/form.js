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
    // сбрасываем селекты
    const selects = $(form).find('select');
    $(selects).each((i, el) => {
      const isChoices = $(el).closest('.choices').length;
      const selectValue = el.defaultSelectedValue;
      if (isChoices) {
        el.choices.setChoiceByValue(selectValue);
        $(el).trigger('change');
      }
    });
    // сбрасываем превюху у изображения
    const images = $('[data-image-preview] img');
    if (images.length > 0) {
      $(images).each((i, el) => {
        const defaultPath = $(el).attr('data-default-path');
        $(el).attr('src', defaultPath);
      });
    }
    // window.setPasswordMask();
    // сбрасываем положение лейблов
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


  // отключенные секции
  const formDisabledElements = $('[data-checker]');

  // изменяет состояние элементов в переданной секции
  const stateElements = {
    disabled(section) {
      $(section).addClass('is-disabled');
      const elements = $(section).find('input, select, textarea');
      $(elements).each((i, el) => {
        $(el).attr('disabled', 'disabled');
      });
    },
    enabled(section) {
      $(section).removeClass('is-disabled');
      const elements = $(section).find('input, select, textarea');
      $(elements).each((i, el) => {
        $(el).removeAttr('disabled', 'disabled');
      });
    },
  };

  // смена состояния по статусу чекера
  function changeState(el) {
    const targetName = $(el).attr('data-checker');
    const targetEl = $(`[data-checker-target=${targetName}]`);
    if ($(el).prop('checked')) {
      stateElements.enabled(targetEl);
    } else {
      stateElements.disabled(targetEl);
    }
  }

  if ($(formDisabledElements).length > 0) {
    $(formDisabledElements).each((i, el) => {
      const checker = el;
      changeState(checker);
    });

    $(document).on('click', '[data-checker]', (evt) => {
      const self = evt.target;
      changeState(self);
    });
  }
}
