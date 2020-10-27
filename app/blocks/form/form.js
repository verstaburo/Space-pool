const $ = window.$;

export default function formManipulations() {
  // активируме скрытую панель при изменении формы
  const formWithHiddenPanel = $('.js-form-with-hidden-panel');

  if ($(formWithHiddenPanel).length > 0) {
    $(document).on('change', '.js-form-with-hidden-panel input:not([data-file-crop]), .js-form-with-hidden-panel textarea, .js-form-with-hidden-panel select', (evt) => {
      const self = evt.target;
      const form = $(self).closest('form');
      const panel = $(form).find('[data-hidden-panel]');
      const btn = $(form).find('.js-show-save-state');
      if (btn.length > 0) {
        $(btn).removeClass('is-disabled');
        $(btn).removeAttr('disabled');
      }
      $(panel).addClass('is-active').removeClass('is-saved');
    });

    $(document).on('input', '.js-form-with-hidden-panel input, .js-form-with-hidden-panel textarea', (evt) => {
      const self = evt.target;
      const form = $(self).closest('form');
      const panel = $(form).find('[data-hidden-panel]');
      const btn = $(form).find('.js-show-save-state');
      if (btn.length > 0) {
        $(btn).removeClass('is-disabled');
        $(btn).removeAttr('disabled');
      }
      $(panel).addClass('is-active').removeClass('is-saved');
    });
  }

  // следим за формой, чтобы остановить панель
  window.addEventListener('scroll', () => {
    const sT = $(window).scrollTop();
    const panel = $(document).find('[data-hidden-panel]');
    let form = $(panel).closest('form');
    if ($(form).length <= 0) {
      form = $(panel).closest('.js-form-with-hidden-panel');
    }
    if ($(panel).length > 0) {
      const wH = $(window).height();
      // const pH = $(panel).outerHeight();
      const fT = $(form).offset().top;
      const fH = $(form).outerHeight();
      const fS = (fT + fH);
      const swT = sT + wH;
      if (swT > fS) {
        $(panel).addClass('is-stop');
      } else {
        $(panel).removeClass('is-stop');
      }
    }
  }, {
    passive: true,
  });

  // сбрасываем форму
  function resetForm(form) {
    form[0].reset();
    // сбрасываем селекты
    const selects = $(form).find('select');
    $(selects).each((i, el) => {
      const isChoices = $(el).closest('.choices, .nd-choices').length;
      const selectValue = el.defaultSelectedValue;
      if (isChoices) {
        el.choices.setChoiceByValue(selectValue);
        $(el).trigger('change');
        $(form).trigger('reset');
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

  $(document).on('reset', '.js-form-with-hidden-panel', (evt) => {
    const form = evt.currentTarget;
    const panel = $(form).find('[data-hidden-panel]');
    $(panel).removeClass('is-active is-saved');
  });

  $(document).on('click', '.js-hide-form-panel', (evt) => {
    const form = $(evt.target).closest('form');
    const panel = $(form).find('[data-hidden-panel]');
    $(panel).removeClass('is-active is-saved');
  });


  // отключенные секции
  const formDisabledElements = $('[data-checker]');
  const formToggleElements = $('[data-toggle-form]');

  // изменяет состояние элементов в переданной секции
  const stateElements = {
    disabled(section) {
      $(section).addClass('is-disabled');
      const elements = $(section).find('input, select, textarea, button');
      $(elements).each((i, el) => {
        $(el).attr('disabled', 'disabled');
      });
    },
    enabled(section) {
      $(section).removeClass('is-disabled');
      const elements = $(section).find('input, select, textarea, button');
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

  window.globalFunctions.changeFormState = changeState;

  function parseDataCustomProperty(el) {
    const result = {};
    const firstArray = el.split(';');
    const firstArrayLength = firstArray.length;
    for (let i = 0; i < firstArrayLength; i += 1) {
      const arr = firstArray[i].split(':');
      result[arr[0]] = arr[1].split(',');
    }
    return result;
  }

  function hideAndShow(hideElements, showElements) {
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

  function changeType(el) {
    if ($(el).attr('data-toggle-form') !== undefined) {
      if ($(el).is('input')) {
        const showElements = $(el).attr('data-show-elements') !== undefined ? $(el).attr('data-show-elements').split(',') : [];
        const hideElements = $(el).attr('data-hide-elements') !== undefined ? $(el).attr('data-hide-elements').split(',') : [];
        if ($(el).prop('checked')) {
          hideAndShow(hideElements, showElements);
        }
      }

      if ($(el).is('select')) {
        const option = $(el).find('option:selected');
        const obj = parseDataCustomProperty($(option).attr('data-custom-properties'));
        const showElements = obj.showElements;
        const hideElements = obj.hideElements;
        hideAndShow(hideElements, showElements);
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

    // $(document).on('click', '[data-toggle-form]', (evt) => {
    //   const self = evt.target;
    //   changeType(self);
    // });

    $(document).on('change', '[data-toggle-form]', (evt) => {
      const self = evt.target;
      changeType(self);
    });
  }

  // Клонирование поинтов
  function pointsClone(el) {
    const group = $(el).closest('[data-point-group]');
    const points = $(group).find('[data-point-object]');
    const totalPoints = $(points).length;
    const count = parseInt($(group).attr('data-point-last-index'), 10) || (totalPoints - 1);
    const nextCount = count + 1;
    const cloneTarget = $(points)[0];
    const clone = $(cloneTarget).clone(true);
    const cloneInput = $(clone).find('input');
    $(cloneInput).val('');
    const name = $(cloneInput).attr('name').split('[')[0];
    $(cloneInput).attr('name', `${name}[${nextCount}]`);
    $(group).append(clone);
    $(group).attr('data-point-last-index', nextCount);
  }

  // $(document).on('focus', '[data-point-object]:last input', (evt) => {
  //   const self = evt.currentTarget;
  //   pointsClone(self);
  // });

  $(document).on('click', '.js-add-object', function () {
    const input = $(this).parents('[data-point-group]').find('[data-point-object] input').eq(0);
    pointsClone(input);
  });

  $(document).on('keydown', '[data-point-object] input', (evt) => {
    const self = evt.currentTarget;

    if (evt.keyCode === 13 || evt.keyCode === 9) {
      evt.preventDefault();
      const wrapper = $(self).closest('[data-point-object]');
      let nextWrapper = $(wrapper).next();

      if (!nextWrapper.length) {
        pointsClone(self);
        nextWrapper = $(wrapper).next();
      }

      const point = $(nextWrapper).find('input')[0];
      point.focus();
    }
  });

  /* eslint-disable no-unused-vars */
  function updateOnBackend(obj) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 300);
    });
  }
  /* eslint-enable no-unused-vars */

  window.serverSave = updateOnBackend;

  $(document).on('click', '.js-show-save-state', (evt) => {
    evt.preventDefault();
    const self = evt.currentTarget;
    const fn = $(self).attr('data-callback-function');
    const form = $(self).closest('form')[0];
    $(self).addClass('is-loading');
    window[fn](form).then((readySaved) => {
      const btn = $(form).find('.js-show-save-state');
      const panel = $(btn).closest('[data-hidden-panel]');
      $(btn).removeClass('is-loading');
      if (readySaved) {
        $(btn).addClass('is-disabled');
        $(btn).attr('disabled', 'disabled');
        $(panel).addClass('is-saved');
      }
    });
  });

  // work of js-show-success-popup find in validate.js file
}
