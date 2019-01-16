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

  if ($('.js-select-color').length) {
    const choices = new Choices('.js-select-color', {
      searchEnabled: false,
      itemSelectText: '',
      classNames: {
        containerOuter: 'choices choices_light choices_color',
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
    $('.js-select-dark').each((i, el) => {
      const self = el;
      const choices = new Choices(self, {
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

      self.choices = choices;
    });
  }

  if ($('.js-select-input').length) {
    $('.js-select-input').each((i, el) => {
      const self = el;
      const choices = new Choices(self, {
        searchEnabled: false,
        itemSelectText: '',
        classNames: {
          containerOuter: 'choices choices_input',
        },
        callbackOnCreateTemplates(template) {
          const classNames = this.config.classNames;
          return {
            containerInner: () => template(`
            <div class="${classNames.containerInner}"><div class="choices__toggle"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16.31 9.16"><line x1="15.31" y1="1" x2="8.16" y2="8.16"/><path d="M8.16,9.16a1,1,0,0,1-.71-.3,1,1,0,0,1,0-1.41L14.61.29A1,1,0,0,1,16,.29a1,1,0,0,1,0,1.42L8.86,8.86A1,1,0,0,1,8.16,9.16Z"/><line x1="8.16" y1="8.16" x2="1" y2="1"/><path d="M8.16,9.16a1,1,0,0,1-.71-.3L.29,1.71A1,1,0,0,1,1.71.29L8.86,7.45a1,1,0,0,1,0,1.41A1,1,0,0,1,8.16,9.16Z"/></svg></div></div>
          `),
            dropdown: () => template(`
            <div class="${classNames.list} ${classNames.listDropdown} js-scrollbar-light-gray" aria-expanded="false"></div>
          `),
          };
        },
      });

      self.choices = choices;
    });
  }

  // добавляем состояние сделанного выбора у списков
  if ($('select').length) {
    $('select').each((i, el) => {
      const value = el.value;
      const container = $(el).closest('.choices');
      if (value !== 'placeholder' && container.length > 0) {
        $(container).addClass('is-item-select');
      } else {
        $(container).removeClass('is-item-select');
      }
    });

    $(document).on('change', 'select', (evt) => {
      const self = evt.target;
      const value = self.value;
      const container = $(self).closest('.choices');
      if (value !== 'placeholder' && container.length > 0) {
        $(container).addClass('is-item-select');
      } else {
        $(container).removeClass('is-item-select');
      }
    });
  }

  // следим чтобы не вылезали за правую границу страницы
  function sideOpen() {
    $('.choices').each((i, el) => {
      const self = el;
      const dropdown = $(el).find('.choices__list--dropdown');
      const dropdownWidth = $(dropdown).width();
      const pageWidth = $(window).width();
      const selfLeft = $(self).offset().left;
      const diff = pageWidth - selfLeft;
      if (diff < dropdownWidth) {
        $(self).addClass('is-open-right');
      } else {
        $(self).removeClass('is-open-right');
      }
    });
  }

  sideOpen();
  $(window).on('resize', sideOpen);
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

$.fn.datepicker.language.en = {
  days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  daysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  today: 'Today',
  clear: 'Clear',
  dateFormat: 'mm/dd/yyyy',
  timeFormat: 'hh:ii aa',
  firstDay: 0,
};

export function datepicker() {
  $('.js-datepicker').each(function () {
    const el = $(this);

    el.datepicker({
      language: 'en',
      dateFormat: 'dd MM yyyy',
    });
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

    const minus = $(this).is('[class*="minus"]') || false;

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
