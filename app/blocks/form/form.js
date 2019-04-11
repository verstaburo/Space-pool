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

  // следим за формой, чтобы остановить панель
  $(window).on('scroll', () => {
    const sT = $(window).scrollTop();
    const panel = $(document).find('[data-hidden-panel]');
    const form = $(panel).closest('form');
    if ($(panel).length > 0) {
      const wH = $(window).height();
      const pH = $(panel).outerHeight();
      const fT = $(form).offset().top;
      const fH = $(form).outerHeight();
      const fS = (fT + fH) - pH;
      const swT = sT + wH;
      if (swT > fS) {
        $(panel).addClass('is-stop');
      } else {
        $(panel).removeClass('is-stop');
      }
    }
  });

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
    // сбрасываем ползунок
    const ranges = $(form).find('.js-range');
    $(ranges).each((i, el) => {
      const range = $(el).find('[data-range-container]').get(0);
      range.noUiSlider.updateOptions({
        start: $(el).data('start'),
      });
    });
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
  const formToggleElements = $('[data-toggle-form]');

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

  function changeType(el) {
    if ($(el).attr('data-toggle-form') !== undefined) {
      const showElements = $(el).attr('data-show-elements') !== undefined ? $(el).attr('data-show-elements').split(',') : [];
      const hideElements = $(el).attr('data-hide-elements') !== undefined ? $(el).attr('data-hide-elements').split(',') : [];
      if ($(el).prop('checked')) {
        $(hideElements).each((ix, item) => {
          const itemElement = $(`[data-form-element="${item}"]`);
          $(itemElement).addClass('hide');
          const elements = $(itemElement).find('input, select, textarea');
          $(elements).each((i, elems) => {
            $(elems).attr('disabled', 'disabled');
          });
        });
        $(showElements).each((ix, item) => {
          const itemElement = $(`[data-form-element="${item}"]`);
          $(itemElement).removeClass('hide is-disabled');
          const elements = $(itemElement).find('input, select, textarea');
          $(elements).each((i, elems) => {
            $(elems).removeAttr('disabled');
          });
          if ($('[data-checker]').length > 0) {
            $('[data-checker]').not('[disabled]').each((i, checkers) => {
              const checker = checkers;
              changeState(checker);
            });
          }
        });
      }
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

  if ($(formToggleElements).length > 0) {
    $(formToggleElements).each((i, el) => {
      const checker = el;
      changeType(checker);
    });

    $(document).on('click', '[data-toggle-form]', (evt) => {
      const self = evt.target;
      changeType(self);
    });
  }
}
