// https://github.com/jshjohnson/Choices
import Choices from 'choices.js';

// https://github.com/leongersen/noUiSlider
import noUiSlider from 'nouislider';

// https://github.com/t1m0n/air-datepicker
import 'air-datepicker';

// https://www.jacklmoore.com/autosize/
import autosize from 'autosize';

const $ = window.$;

export function selects() {
  /* eslint-disable no-unused-vars */
  function inputSelectInit(select) {
    const self = select[0];
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
      callbackOnInit() {
        const sel = this.passedElement.element;
        const main = this.containerOuter.element;
        if ($(sel).attr('readonly') !== undefined) {
          $(main).addClass('is-readonly');
        }
      },
    });
    const defaultValue = self.value;
    self.choices = choices;
    self.defaultSelectedValue = defaultValue;
  }

  window.inputSelectInit = inputSelectInit;

  if ($('.js-select').length) {
    $('.js-select').each((i, el) => {
      const self = el;
      const choices = new Choices(self, {
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
        callbackOnInit() {
          const select = this.passedElement.element;
          const main = this.containerOuter.element;
          if ($(select).attr('readonly') !== undefined) {
            $(main).addClass('is-readonly');
          }
        },
      });

      self.choices = choices;
      const defaultValue = el.value;
      self.defaultSelectedValue = defaultValue;
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
      callbackOnInit() {
        const select = this.passedElement.element;
        const main = this.containerOuter.element;
        if ($(select).attr('readonly') !== undefined) {
          $(main).addClass('is-readonly');
        }
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
      callbackOnInit() {
        const select = this.passedElement.element;
        const main = this.containerOuter.element;
        if ($(select).attr('readonly') !== undefined) {
          $(main).addClass('is-readonly');
        }
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
        callbackOnInit() {
          const select = this.passedElement.element;
          const main = this.containerOuter.element;
          if ($(select).attr('readonly') !== undefined) {
            $(main).addClass('is-readonly');
          }
        },
      });

      self.choices = choices;
      const defaultValue = el.value;
      self.defaultSelectedValue = defaultValue;
    });
  }

  if ($('.js-select-dark2').length) {
    $('.js-select-dark2').each((i, el) => {
      const self = el;
      const choices = new Choices(self, {
        searchEnabled: false,
        itemSelectText: '',
        classNames: {
          containerOuter: 'choices choices_dark2',
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
        callbackOnInit() {
          const select = this.passedElement.element;
          const main = this.containerOuter.element;
          if ($(select).attr('readonly') !== undefined) {
            $(main).addClass('is-readonly');
          }
        },
      });

      self.choices = choices;
      const defaultValue = el.value;
      self.defaultSelectedValue = defaultValue;
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
        callbackOnInit() {
          const select = this.passedElement.element;
          const main = this.containerOuter.element;
          if ($(select).attr('readonly') !== undefined) {
            $(main).addClass('is-readonly');
          }
        },
      });

      self.choices = choices;
      const defaultValue = el.value;
      self.defaultSelectedValue = defaultValue;
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

  $('.js-days-calendar').each(function () {
    const el = $(this);
    /* eslint-disable consistent-return */
    el.datepicker({
      classes: 'calendar__grid',
      language: 'en',
      dateFormat: 'dd MM yyyy',
      inline: true,
      navTitles: {
        days: '<span data-month="data-month">m</span><span data-year="data-year">yyyy</span>',
      },
      moveToOtherYearsOnSelect: false,
      selectOtherYears: false,
      selectOtherMonths: false,
      altField: '[data-calendar-output]',
      altFieldDateFormat: 'yyyy MM d',
      onRenderCell(date, cellType) {
        if (cellType === 'day') {
          return {
            html: `<span>${date.getDate()}</span>`,
          };
        }
        if (cellType === 'year') {
          return {
            html: `<span>${date.getFullYear()}</span>`,
          };
        }
      },
      onSelect(formattedDate, date, inst) {
        const self = inst.el;
        const parentSection = $(self).closest('[data-record-step]');
        const nextSection = $('[data-record-step="2"]');
        $(parentSection).removeClass('is-active');
        $(nextSection).addClass('is-active');
      },
    });
    /* eslint-enable consistent-return */
  });
}

export function numberinput() {
  $(document).on('click', '.js-numberbox-minus, .js-numberbox-plus', function (e) {
    e.preventDefault();

    const input = $(this).closest('.input-numberbox, .input-numbers').find('.js-numberbox-input');
    let val;
    const min = parseInt($(input).attr('data-min'), 10) || 0;
    const max = parseInt($(input).attr('data-max'), 10) || false;

    const minus = $(this).is('[class*="minus"]') || false;

    if (!input.val()) {
      val = min;
      input.val(min);
    } else {
      val = +input.val();
    }

    if (minus) {
      input.val(val > min ? (val -= 1) : min);
    } else if (max) {
      input.val(val < max ? (val += 1) : max);
    } else {
      input.val(val += 1);
    }
    setTimeout(() => {
      input.trigger('input');
    }, 50);
  });

  $(document).on('keyup change', '.js-numberbox-input', function () {
    const min = parseInt($(this).attr('data-min'), 10) || 0;
    const max = parseInt($(this).attr('data-max'), 10) || false;
    this.value = this.value.replace(/[^\d]/, '');
    if ($(this).val() < min) $(this).val(min);
    if (max && $(this).val() > max) $(this).val(max);
    setTimeout(() => {
      $(this).trigger('input');
    }, 50);
  });
}

// автосайз для textarea
export function textareaAutosize() {
  autosize($('.textarea'));
}

// маска паролей
export function passwordMask() {
  // function presetMask() {
  //   const passwordFields = $('.js-password-field input');
  //   $(passwordFields).each((i, el) => {
  //     const parent = $(el).closest('.js-password-field');
  //     const value = el.value.length;
  //     const mask = $(parent).find('[data-password-mask]');
  //     let result = '';
  //     for (let j = 0; j < value; j += 1) {
  //       result += '<span></span>';
  //     }
  //     $(mask).empty();
  //     $(mask).append(result);
  //   });
  // }

  // window.setPasswordMask = presetMask;

  // presetMask();

  // $(document).on('input change', '.js-password-field input', (evt) => {
  //   const self = evt.target;
  //   const parent = $(self).closest('.js-password-field');
  //   const value = self.value.length;
  //   const mask = $(parent).find('[data-password-mask]');
  //   const spans = $(mask).find('span');
  //   if (value !== $(spans).length && value !== 0) {
  //     let result = '';
  //     for (let i = 0; i < value; i += 1) {
  //       result += '<span></span>';
  //     }
  //     $(mask).empty();
  //     $(mask).append(result);
  //   } else if (value === 0) {
  //     $(mask).empty();
  //   }
  // });
}
