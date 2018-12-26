// https://github.com/jshjohnson/Choices
import Choices from 'choices.js';

// https://github.com/leongersen/noUiSlider
import noUiSlider from 'nouislider';

// https://github.com/t1m0n/air-datepicker
import 'air-datepicker';

// https://github.com/RobinHerbots/Inputmask
import Inputmask from 'inputmask';

const $ = window.$;

export function selects() {
  /* eslint-disable no-unused-vars */
  if ($('.js-select').length) {
    const choices = new Choices('.js-select', {
      searchEnabled: false,
      itemSelectText: '',
      classNames: {
        containerOuter: 'choices',
      },
      callbackOnCreateTemplates(template) {
        const classNames = this.config.classNames;
        return {
          containerInner: () => template(`
            <div class="${classNames.containerInner}"><div class="choices__toggle"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16.31 9.16"><line x1="15.31" y1="1" x2="8.16" y2="8.16"/><path d="M8.16,9.16a1,1,0,0,1-.71-.3,1,1,0,0,1,0-1.41L14.61.29A1,1,0,0,1,16,.29a1,1,0,0,1,0,1.42L8.86,8.86A1,1,0,0,1,8.16,9.16Z"/><line x1="8.16" y1="8.16" x2="1" y2="1"/><path d="M8.16,9.16a1,1,0,0,1-.71-.3L.29,1.71A1,1,0,0,1,1.71.29L8.86,7.45a1,1,0,0,1,0,1.41A1,1,0,0,1,8.16,9.16Z"/></svg></div></div>
          `),
          dropdown: () => template(`
            <div class="${classNames.list} ${classNames.listDropdown} js-scrollbar-dark" aria-expanded="false"></div>
          `),
        };
      },
    });
  }

  if ($('.js-select-light').length) {
    const choices = new Choices('.js-select-light', {
      searchEnabled: false,
      itemSelectText: '',
      classNames: {
        containerOuter: 'choices choices_light',
      },
      callbackOnCreateTemplates(template) {
        const classNames = this.config.classNames;
        return {
          containerInner: () => template(`
            <div class="${classNames.containerInner}"><div class="choices__toggle"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16.31 9.16"><line x1="15.31" y1="1" x2="8.16" y2="8.16"/><path d="M8.16,9.16a1,1,0,0,1-.71-.3,1,1,0,0,1,0-1.41L14.61.29A1,1,0,0,1,16,.29a1,1,0,0,1,0,1.42L8.86,8.86A1,1,0,0,1,8.16,9.16Z"/><line x1="8.16" y1="8.16" x2="1" y2="1"/><path d="M8.16,9.16a1,1,0,0,1-.71-.3L.29,1.71A1,1,0,0,1,1.71.29L8.86,7.45a1,1,0,0,1,0,1.41A1,1,0,0,1,8.16,9.16Z"/></svg></div></div>
          `),
          dropdown: () => template(`
            <div class="${classNames.list} ${classNames.listDropdown} js-scrollbar-dark" aria-expanded="false"></div>
          `),
        };
      },
    });
  }

  if ($('.js-select-dark').length) {
    const choices = new Choices('.js-select-dark', {
      searchEnabled: false,
      itemSelectText: '',
      classNames: {
        containerOuter: 'choices choices_dark',
      },
      callbackOnCreateTemplates(template) {
        const classNames = this.config.classNames;
        return {
          containerInner: () => template(`
            <div class="${classNames.containerInner}"><div class="choices__toggle"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16.31 9.16"><line x1="15.31" y1="1" x2="8.16" y2="8.16"/><path d="M8.16,9.16a1,1,0,0,1-.71-.3,1,1,0,0,1,0-1.41L14.61.29A1,1,0,0,1,16,.29a1,1,0,0,1,0,1.42L8.86,8.86A1,1,0,0,1,8.16,9.16Z"/><line x1="8.16" y1="8.16" x2="1" y2="1"/><path d="M8.16,9.16a1,1,0,0,1-.71-.3L.29,1.71A1,1,0,0,1,1.71.29L8.86,7.45a1,1,0,0,1,0,1.41A1,1,0,0,1,8.16,9.16Z"/></svg></div></div>
          `),
          dropdown: () => template(`
            <div class="${classNames.list} ${classNames.listDropdown} js-scrollbar-light" aria-expanded="false"></div>
          `),
        };
      },
    });
  }
  /* eslint-enable no-unused-vars */
}

export function sliders() {
  // Параметры берутся из дата-атрибутов
  $('.js-range').each(function () {
    const el = $(this);

    noUiSlider.create(el.get(0), {
      start: el.data('start'),
      connect: el.data('connect'),
      range: {
        min: el.data('min'),
        max: el.data('max'),
      },
    });
  });
}

export function datepicker() {
  $('.js-datepicker').each(function () {
    const el = $(this);

    el.datepicker();
  });
}

export function inputmask() {
  Inputmask({
    mask: '+7 (999) 999-99-99',
  }).mask('input[data-type="tel"]');

  Inputmask({
    alias: 'email',
  }).mask('input[data-type="email"]');
}

export function numberinput() {
  $(document).on('click', '.js-numberbox-minus, .js-numberbox-plus', function (e) {
    e.preventDefault();

    const input = $(this).parent().find('.js-numberbox-input');
    let val = +input.val();

    const minus = $(this).attr('class').includes('minus') || false;

    if (!val.length) {
      input.val(1);
    }

    if (minus) {
      input.val(val > 0 ? (val -= 1) : 0);
    } else {
      input.val(val += 1);
    }
  });

  $(document).on('keyup change', '.js-numberbox-input', function () {
    this.value = this.value.replace(/[^\d]/, '');
    if ($(this).val() < 0) $(this).val(0);
  });
}
