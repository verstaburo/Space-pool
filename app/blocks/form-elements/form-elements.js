// https://github.com/jshjohnson/Choices
import Choices from 'choices.js';

// https://github.com/leongersen/noUiSlider
import noUiSlider from 'nouislider';

// https://github.com/t1m0n/air-datepicker
import 'air-datepicker';

const {
  $,
} = window;

export function selects() {
  function srtFunc(a, b) {
    return a.label.localeCompare(b.label, 'en', {
      numeric: true,
    });
  }

  /* eslint-disable no-unused-vars */
  function inputSelectInit(select) {
    const self = select;
    const additionalClasses = $(self).attr('data-choices-classes') || '';
    const containerClasses = `choices choices_input choices_popup ${additionalClasses}`;
    const title = $(self).attr('data-mobile-title') || $(self).find('option[placeholder]').text() || $(self).attr('placeholder') || 'Select';
    const sorter = ($(self).attr('data-no-sort') === undefined) ? srtFunc : undefined;
    const choices = new Choices(self, {
      // searchEnabled: false,
      itemSelectText: '',
      sorter,
      classNames: {
        containerOuter: containerClasses,
        titleText: title,
      },
      callbackOnCreateTemplates(template) {
        const {
          classNames,
        } = this.config;
        return {
          containerInner: () => template(`
            <div class="${classNames.containerInner}"><div class="choices__toggle"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16.31 9.16"><line x1="15.31" y1="1" x2="8.16" y2="8.16"/><path d="M8.16,9.16a1,1,0,0,1-.71-.3,1,1,0,0,1,0-1.41L14.61.29A1,1,0,0,1,16,.29a1,1,0,0,1,0,1.42L8.86,8.86A1,1,0,0,1,8.16,9.16Z"/><line x1="8.16" y1="8.16" x2="1" y2="1"/><path d="M8.16,9.16a1,1,0,0,1-.71-.3L.29,1.71A1,1,0,0,1,1.71.29L8.86,7.45a1,1,0,0,1,0,1.41A1,1,0,0,1,8.16,9.16Z"/></svg></div></div>
          `),
          dropdown: () => template(`
            <div class="${classNames.list} ${classNames.listDropdown}" aria-expanded="false"><div class="choices__header"><div class="choices__close close js-select-close"><svg class="close__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.36 15.36"><rect x="-2.43" y="6.94" width="20.23" height="1.49" transform="translate(18.55 7.68) rotate(135)"/><rect x="-2.43" y="6.94" width="20.23" height="1.49" transform="translate(7.68 -3.18) rotate(45)"/></svg></div><div class="choices__header-title">${classNames.titleText}</div></div></div>
          `),
        };
      },
      callbackOnInit() {
        const sel = this.passedElement.element;
        const main = this.containerOuter.element;
        const formbox = $(select).closest('label');
        const choiceList = this.choiceList.element;
        const dropdown = this.dropdown.element;
        const scrollWrapper = document.createElement('div');
        scrollWrapper.classList.add('choices__scrollblock');
        $(choiceList).wrap(scrollWrapper);
        const newScrollWrapper = $(dropdown).find('.choices__scrollblock');
        window.globalFunctions.scrollbarLightGray(newScrollWrapper, true);
        if ($(sel).attr('readonly') !== undefined) {
          $(main).addClass('is-readonly');
          $(formbox).addClass('is-readonly');
        }
      },
    });
    const defaultValue = self.value;
    const cross = $(choices.dropdown.element).find('.js-select-close')[0];
    cross.choices = choices;
    self.choices = choices;
    self.defaultSelectedValue = defaultValue;
  }

  window.inputSelectInit = inputSelectInit;

  function input2SelectInit(select) {
    const self = select[0];
    const additionalClasses = $(self).attr('data-choices-classes') || '';
    const containerClasses = `choices choices_input2 choices_popup ${additionalClasses}`;
    const title = $(self).attr('data-mobile-title') || $(self).find('option[placeholder]').text() || $(self).attr('placeholder') || 'Select';
    const sorter = ($(self).attr('data-no-sort') === undefined) ? srtFunc : undefined;
    const choices = new Choices(self, {
      // searchEnabled: false,
      itemSelectText: '',
      classNames: {
        containerOuter: containerClasses,
        titleText: title,
      },
      sorter,
      callbackOnCreateTemplates(template) {
        const {
          classNames,
        } = this.config;
        return {
          containerInner: () => template(`
            <div class="${classNames.containerInner}"><div class="choices__toggle"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16.31 9.16"><line x1="15.31" y1="1" x2="8.16" y2="8.16"/><path d="M8.16,9.16a1,1,0,0,1-.71-.3,1,1,0,0,1,0-1.41L14.61.29A1,1,0,0,1,16,.29a1,1,0,0,1,0,1.42L8.86,8.86A1,1,0,0,1,8.16,9.16Z"/><line x1="8.16" y1="8.16" x2="1" y2="1"/><path d="M8.16,9.16a1,1,0,0,1-.71-.3L.29,1.71A1,1,0,0,1,1.71.29L8.86,7.45a1,1,0,0,1,0,1.41A1,1,0,0,1,8.16,9.16Z"/></svg></div></div>
          `),
          dropdown: () => template(`
            <div class="${classNames.list} ${classNames.listDropdown}" aria-expanded="false"><div class="choices__header"><div class="choices__close close js-select-close"><svg class="close__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.36 15.36"><rect x="-2.43" y="6.94" width="20.23" height="1.49" transform="translate(18.55 7.68) rotate(135)"/><rect x="-2.43" y="6.94" width="20.23" height="1.49" transform="translate(7.68 -3.18) rotate(45)"/></svg></div><div class="choices__header-title">${classNames.titleText}</div></div></div>
          `),
        };
      },
      callbackOnInit() {
        const sel = this.passedElement.element;
        const main = this.containerOuter.element;
        const formbox = $(select).closest('label');
        const choiceList = this.choiceList.element;
        const dropdown = this.dropdown.element;
        const scrollWrapper = document.createElement('div');
        scrollWrapper.classList.add('choices__scrollblock');
        $(choiceList).wrap(scrollWrapper);
        const newScrollWrapper = $(dropdown).find('.choices__scrollblock');
        window.globalFunctions.scrollbarLightGray(newScrollWrapper, true);
        if ($(sel).attr('readonly') !== undefined) {
          $(main).addClass('is-readonly');
          $(formbox).addClass('is-readonly');
        }
      },
    });
    const defaultValue = self.value;
    const cross = $(choices.dropdown.element).find('.js-select-close')[0];
    cross.choices = choices;
    self.choices = choices;
    self.defaultSelectedValue = defaultValue;
  }

  window.input2SelectInit = input2SelectInit;

  if ($('.js-select').length) {
    $('.js-select').each((i, el) => {
      const self = el;
      const title = $(self).attr('data-mobile-title') || $(self).find('option[placeholder]').text() || $(self).attr('placeholder') || 'Select';
      const sorter = ($(self).attr('data-no-sort') === undefined) ? srtFunc : undefined;
      const choices = new Choices(self, {
        // searchEnabled: false,
        searchFields: ['label'],
        itemSelectText: '',
        classNames: {
          containerOuter: 'choices choices_popup',
          titleText: title,
        },
        sorter,
        callbackOnCreateTemplates(template) {
          const {
            classNames,
          } = this.config;
          return {
            containerInner: () => template(`
            <div class="${classNames.containerInner}"><div class="choices__toggle"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16.31 9.16"><line x1="15.31" y1="1" x2="8.16" y2="8.16"/><path d="M8.16,9.16a1,1,0,0,1-.71-.3,1,1,0,0,1,0-1.41L14.61.29A1,1,0,0,1,16,.29a1,1,0,0,1,0,1.42L8.86,8.86A1,1,0,0,1,8.16,9.16Z"/><line x1="8.16" y1="8.16" x2="1" y2="1"/><path d="M8.16,9.16a1,1,0,0,1-.71-.3L.29,1.71A1,1,0,0,1,1.71.29L8.86,7.45a1,1,0,0,1,0,1.41A1,1,0,0,1,8.16,9.16Z"/></svg></div></div>
          `),
            dropdown: () => template(`
            <div class="${classNames.list} ${classNames.listDropdown}" aria-expanded="false"><div class="choices__header"><div class="choices__close close js-select-close"><svg class="close__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.36 15.36"><rect x="-2.43" y="6.94" width="20.23" height="1.49" transform="translate(18.55 7.68) rotate(135)"/><rect x="-2.43" y="6.94" width="20.23" height="1.49" transform="translate(7.68 -3.18) rotate(45)"/></svg></div><div class="choices__header-title">${classNames.titleText}</div></div></div>
          `),
          };
        },
        callbackOnInit() {
          const select = this.passedElement.element;
          const main = this.containerOuter.element;
          const formbox = $(select).closest('label');
          const choiceList = this.choiceList.element;
          const dropdown = this.dropdown.element;
          const scrollWrapper = document.createElement('div');
          scrollWrapper.classList.add('choices__scrollblock');
          $(choiceList).wrap(scrollWrapper);
          const newScrollWrapper = $(dropdown).find('.choices__scrollblock');
          window.globalFunctions.scrollbarDark(newScrollWrapper, true);
          if ($(select).attr('readonly') !== undefined) {
            $(main).addClass('is-readonly');
            $(formbox).addClass('is-readonly');
          }
        },
      });

      self.choices = choices;
      const cross = $(choices.dropdown.element).find('.js-select-close')[0];
      cross.choices = choices;
      const defaultValue = el.value;
      self.defaultSelectedValue = defaultValue;
    });
  }

  if ($('.js-select-light').length) {
    $('.js-select-light').each((i, el) => {
      const self = el;
      const title = $(self).attr('data-mobile-title') || $(self).find('option[placeholder]').text() || $(self).attr('placeholder') || 'Select';
      const sorter = ($(self).attr('data-no-sort') === undefined) ? srtFunc : undefined;
      const choices = new Choices(self, {
        // searchEnabled: false,
        searchFields: ['label'],
        itemSelectText: '',
        classNames: {
          containerOuter: 'choices choices_light choices_popup',
          titleText: title,
        },
        sorter,
        callbackOnCreateTemplates(template) {
          const {
            classNames,
          } = this.config;
          return {
            containerInner: () => template(`
            <div class="${classNames.containerInner}"><div class="choices__toggle"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16.31 9.16"><line x1="15.31" y1="1" x2="8.16" y2="8.16"/><path d="M8.16,9.16a1,1,0,0,1-.71-.3,1,1,0,0,1,0-1.41L14.61.29A1,1,0,0,1,16,.29a1,1,0,0,1,0,1.42L8.86,8.86A1,1,0,0,1,8.16,9.16Z"/><line x1="8.16" y1="8.16" x2="1" y2="1"/><path d="M8.16,9.16a1,1,0,0,1-.71-.3L.29,1.71A1,1,0,0,1,1.71.29L8.86,7.45a1,1,0,0,1,0,1.41A1,1,0,0,1,8.16,9.16Z"/></svg></div></div>
          `),
            dropdown: () => template(`
            <div class="${classNames.list} ${classNames.listDropdown}" aria-expanded="false"><div class="choices__header"><div class="choices__close close js-select-close"><svg class="close__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.36 15.36"><rect x="-2.43" y="6.94" width="20.23" height="1.49" transform="translate(18.55 7.68) rotate(135)"/><rect x="-2.43" y="6.94" width="20.23" height="1.49" transform="translate(7.68 -3.18) rotate(45)"/></svg></div><div class="choices__header-title">${classNames.titleText}</div></div></div>
          `),
          };
        },
        callbackOnInit() {
          const select = this.passedElement.element;
          const main = this.containerOuter.element;
          const formbox = $(select).closest('label');
          const choiceList = this.choiceList.element;
          const dropdown = this.dropdown.element;
          const scrollWrapper = document.createElement('div');
          scrollWrapper.classList.add('choices__scrollblock');
          $(choiceList).wrap(scrollWrapper);
          const newScrollWrapper = $(dropdown).find('.choices__scrollblock');
          window.globalFunctions.scrollbarBold(newScrollWrapper, true);
          if ($(select).attr('readonly') !== undefined) {
            $(main).addClass('is-readonly');
            $(formbox).addClass('is-readonly');
          }
        },
      });
      self.choices = choices;
      const cross = $(choices.dropdown.element).find('.js-select-close')[0];
      cross.choices = choices;
      const defaultValue = el.value;
      self.defaultSelectedValue = defaultValue;
    });
  }

  if ($('.js-select-color').length) {
    $('.js-select-color').each((i, el) => {
      const self = el;
      const title = $(self).attr('data-mobile-title') || $(self).find('option[placeholder]').text() || $(self).attr('placeholder') || 'Select';
      const sorter = ($(self).attr('data-no-sort') === undefined) ? srtFunc : undefined;
      const choices = new Choices(self, {
        // searchEnabled: false,
        searchFields: ['label'],
        itemSelectText: '',
        sorter,
        classNames: {
          containerOuter: 'choices choices_light choices_color choices_popup',
          titleText: title,
        },
        callbackOnCreateTemplates(template) {
          const {
            classNames,
          } = this.config;
          return {
            containerInner: () => template(`
            <div class="${classNames.containerInner}"><div class="choices__toggle"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16.31 9.16"><line x1="15.31" y1="1" x2="8.16" y2="8.16"/><path d="M8.16,9.16a1,1,0,0,1-.71-.3,1,1,0,0,1,0-1.41L14.61.29A1,1,0,0,1,16,.29a1,1,0,0,1,0,1.42L8.86,8.86A1,1,0,0,1,8.16,9.16Z"/><line x1="8.16" y1="8.16" x2="1" y2="1"/><path d="M8.16,9.16a1,1,0,0,1-.71-.3L.29,1.71A1,1,0,0,1,1.71.29L8.86,7.45a1,1,0,0,1,0,1.41A1,1,0,0,1,8.16,9.16Z"/></svg></div></div>
          `),
            dropdown: () => template(`
            <div class="${classNames.list} ${classNames.listDropdown}" aria-expanded="false"><div class="choices__header"><div class="choices__close close js-select-close"><svg class="close__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.36 15.36"><rect x="-2.43" y="6.94" width="20.23" height="1.49" transform="translate(18.55 7.68) rotate(135)"/><rect x="-2.43" y="6.94" width="20.23" height="1.49" transform="translate(7.68 -3.18) rotate(45)"/></svg></div><div class="choices__header-title">${classNames.titleText}</div></div></div>
          `),
          };
        },
        callbackOnInit() {
          const select = this.passedElement.element;
          const main = this.containerOuter.element;
          const formbox = $(select).closest('label');
          const choiceList = this.choiceList.element;
          const dropdown = this.dropdown.element;
          const scrollWrapper = document.createElement('div');
          scrollWrapper.classList.add('choices__scrollblock');
          $(choiceList).wrap(scrollWrapper);
          const newScrollWrapper = $(dropdown).find('.choices__scrollblock');
          window.globalFunctions.scrollbarBold(newScrollWrapper, true);
          if ($(select).attr('readonly') !== undefined) {
            $(main).addClass('is-readonly');
            $(formbox).addClass('is-readonly');
          }
        },
      });
      self.choices = choices;
      const cross = $(choices.dropdown.element).find('.js-select-close')[0];
      cross.choices = choices;
      const defaultValue = el.value;
      self.defaultSelectedValue = defaultValue;
    });
  }

  if ($('.js-select-dark').length) {
    $('.js-select-dark').each((i, el) => {
      const self = el;
      const title = $(self).attr('data-mobile-title') || $(self).find('option[placeholder]').text() || $(self).attr('placeholder') || 'Select';
      const sorter = ($(self).attr('data-no-sort') === undefined) ? srtFunc : undefined;
      const choices = new Choices(self, {
        // searchEnabled: false,
        searchFields: ['label'],
        itemSelectText: '',
        sorter,
        classNames: {
          containerOuter: 'choices choices_dark choices_popup',
          titleText: title,
        },
        callbackOnCreateTemplates(template) {
          const {
            classNames,
          } = this.config;
          return {
            containerInner: () => template(`
            <div class="${classNames.containerInner}"><div class="choices__toggle"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16.31 9.16"><line x1="15.31" y1="1" x2="8.16" y2="8.16"/><path d="M8.16,9.16a1,1,0,0,1-.71-.3,1,1,0,0,1,0-1.41L14.61.29A1,1,0,0,1,16,.29a1,1,0,0,1,0,1.42L8.86,8.86A1,1,0,0,1,8.16,9.16Z"/><line x1="8.16" y1="8.16" x2="1" y2="1"/><path d="M8.16,9.16a1,1,0,0,1-.71-.3L.29,1.71A1,1,0,0,1,1.71.29L8.86,7.45a1,1,0,0,1,0,1.41A1,1,0,0,1,8.16,9.16Z"/></svg></div></div>
          `),
            dropdown: () => template(`
            <div class="${classNames.list} ${classNames.listDropdown}" aria-expanded="false"><div class="choices__header"><div class="choices__close close js-select-close"><svg class="close__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.36 15.36"><rect x="-2.43" y="6.94" width="20.23" height="1.49" transform="translate(18.55 7.68) rotate(135)"/><rect x="-2.43" y="6.94" width="20.23" height="1.49" transform="translate(7.68 -3.18) rotate(45)"/></svg></div><div class="choices__header-title">${classNames.titleText}</div></div></div>
          `),
          };
        },
        callbackOnInit() {
          const select = this.passedElement.element;
          const main = this.containerOuter.element;
          const formbox = $(select).closest('label');
          const choiceList = this.choiceList.element;
          const dropdown = this.dropdown.element;
          const scrollWrapper = document.createElement('div');
          scrollWrapper.classList.add('choices__scrollblock');
          $(choiceList).wrap(scrollWrapper);
          const newScrollWrapper = $(dropdown).find('.choices__scrollblock');
          window.globalFunctions.scrollbarLight(newScrollWrapper, true);
          if ($(select).attr('readonly') !== undefined) {
            $(formbox).addClass('is-readonly');
            $(main).addClass('is-readonly');
          }
        },
      });

      self.choices = choices;
      const cross = $(choices.dropdown.element).find('.js-select-close')[0];
      cross.choices = choices;
      const defaultValue = el.value;
      self.defaultSelectedValue = defaultValue;
    });
  }

  if ($('.js-select-dark2').length) {
    $('.js-select-dark2').each((i, el) => {
      const self = el;
      const sorter = ($(self).attr('data-no-sort') === undefined) ? srtFunc : undefined;
      const title = $(self).attr('data-mobile-title') || $(self).find('option[placeholder]').text() || $(self).attr('placeholder') || 'Select';
      const choices = new Choices(self, {
        // searchEnabled: false,
        searchFields: ['label'],
        itemSelectText: '',
        classNames: {
          containerOuter: 'choices choices_dark2 choices_popup',
          titleText: title,
        },
        sorter,
        callbackOnCreateTemplates(template) {
          const {
            classNames,
          } = this.config;
          return {
            containerInner: () => template(`
            <div class="${classNames.containerInner}"><div class="choices__toggle"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16.31 9.16"><line x1="15.31" y1="1" x2="8.16" y2="8.16"/><path d="M8.16,9.16a1,1,0,0,1-.71-.3,1,1,0,0,1,0-1.41L14.61.29A1,1,0,0,1,16,.29a1,1,0,0,1,0,1.42L8.86,8.86A1,1,0,0,1,8.16,9.16Z"/><line x1="8.16" y1="8.16" x2="1" y2="1"/><path d="M8.16,9.16a1,1,0,0,1-.71-.3L.29,1.71A1,1,0,0,1,1.71.29L8.86,7.45a1,1,0,0,1,0,1.41A1,1,0,0,1,8.16,9.16Z"/></svg></div></div>
          `),
            dropdown: () => template(`
            <div class="${classNames.list} ${classNames.listDropdown}" aria-expanded="false"><div class="choices__header"><div class="choices__close close js-select-close"><svg class="close__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.36 15.36"><rect x="-2.43" y="6.94" width="20.23" height="1.49" transform="translate(18.55 7.68) rotate(135)"/><rect x="-2.43" y="6.94" width="20.23" height="1.49" transform="translate(7.68 -3.18) rotate(45)"/></svg></div><div class="choices__header-title">${classNames.titleText}</div></div></div>
          `),
          };
        },
        callbackOnInit() {
          const select = this.passedElement.element;
          const main = this.containerOuter.element;
          const formbox = $(select).closest('label');
          const choiceList = this.choiceList.element;
          const dropdown = this.dropdown.element;
          const scrollWrapper = document.createElement('div');
          scrollWrapper.classList.add('choices__scrollblock');
          $(choiceList).wrap(scrollWrapper);
          const newScrollWrapper = $(dropdown).find('.choices__scrollblock');
          window.globalFunctions.scrollbarLight(newScrollWrapper, true);
          if ($(select).attr('readonly') !== undefined) {
            $(main).addClass('is-readonly');
            $(formbox).addClass('is-readonly');
          }
        },
      });

      self.choices = choices;
      const cross = $(choices.dropdown.element).find('.js-select-close')[0];
      cross.choices = choices;
      const defaultValue = el.value;
      self.defaultSelectedValue = defaultValue;
    });
  }

  if ($('.js-select-dark3').length) {
    $('.js-select-dark3').each((i, el) => {
      const self = el;
      const sorter = ($(self).attr('data-no-sort') === undefined) ? srtFunc : undefined;
      const title = $(self).attr('data-mobile-title') || $(self).find('option[placeholder]').text() || $(self).attr('placeholder') || 'Select';
      const choices = new Choices(self, {
        // searchEnabled: false,
        searchFields: ['label'],
        itemSelectText: '',
        sorter,
        classNames: {
          containerOuter: 'choices choices_dark3 choices_popup',
          titleText: title,
        },
        callbackOnCreateTemplates(template) {
          const {
            classNames,
          } = this.config;
          return {
            containerInner: () => template(`
            <div class="${classNames.containerInner}"><div class="choices__toggle"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16.31 9.16"><line x1="15.31" y1="1" x2="8.16" y2="8.16"/><path d="M8.16,9.16a1,1,0,0,1-.71-.3,1,1,0,0,1,0-1.41L14.61.29A1,1,0,0,1,16,.29a1,1,0,0,1,0,1.42L8.86,8.86A1,1,0,0,1,8.16,9.16Z"/><line x1="8.16" y1="8.16" x2="1" y2="1"/><path d="M8.16,9.16a1,1,0,0,1-.71-.3L.29,1.71A1,1,0,0,1,1.71.29L8.86,7.45a1,1,0,0,1,0,1.41A1,1,0,0,1,8.16,9.16Z"/></svg></div></div>
          `),
            dropdown: () => template(`
            <div class="${classNames.list} ${classNames.listDropdown}" aria-expanded="false"><div class="choices__header"><div class="choices__close close js-select-close"><svg class="close__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.36 15.36"><rect x="-2.43" y="6.94" width="20.23" height="1.49" transform="translate(18.55 7.68) rotate(135)"/><rect x="-2.43" y="6.94" width="20.23" height="1.49" transform="translate(7.68 -3.18) rotate(45)"/></svg></div><div class="choices__header-title">${classNames.titleText}</div></div></div>
          `),
          };
        },
        callbackOnInit() {
          const select = this.passedElement.element;
          const main = this.containerOuter.element;
          const formbox = $(select).closest('label');
          const choiceList = this.choiceList.element;
          const dropdown = this.dropdown.element;
          const scrollWrapper = document.createElement('div');
          scrollWrapper.classList.add('choices__scrollblock');
          $(choiceList).wrap(scrollWrapper);
          const newScrollWrapper = $(dropdown).find('.choices__scrollblock');
          window.globalFunctions.scrollbarLight(newScrollWrapper, true);
          if ($(select).attr('readonly') !== undefined) {
            $(main).addClass('is-readonly');
            $(formbox).addClass('is-readonly');
          }
        },
      });

      self.choices = choices;
      const cross = $(choices.dropdown.element).find('.js-select-close')[0];
      cross.choices = choices;
      const defaultValue = el.value;
      self.defaultSelectedValue = defaultValue;
    });
  }

  if ($('.js-select-input').length) {
    $('.js-select-input').each((i, el) => {
      inputSelectInit(el);
    });
  }

  if ($('.js-select-input2').length) {
    $('.js-select-input2').each((i, el) => {
      input2SelectInit($(el));
    });
  }

  /* eslint-enable no-unused-vars */
}

export function sliders() {
  // Параметры берутся из дата-атрибутов
  $('.js-range').each(function () {
    const el = $(this);
    const margin = el.data('margin') || 0;
    const step = el.data('step') || 1;
    noUiSlider.create(el.find('[data-range-container]').get(0), {
      start: el.data('start'),
      connect: el.data('connect'),
      margin,
      step,
      range: {
        min: el.data('min'),
        max: el.data('max'),
      },
    });

    const range = el.find('[data-range-container]').get(0);
    const output = el.find('[data-range-output]');

    if (output.length > 0) {
      const nodes = [$('[data-range-min]'), $('[data-range-max]')];
      range.noUiSlider.on('update', (values, handle) => {
        nodes[handle].text(parseInt(values[handle], 10));
      });
    }

    const inputs = [$('[data-range-input-min]'), $('[data-range-input-max]')];
    range.noUiSlider.on('update', (values, handle) => {
      inputs[handle].val(parseInt(values[handle], 10));
      inputs[handle].trigger('change');
    });
  });

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
      window.setLabelPosition(inputs[handle]);
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
    const rangeWrapper = $(range).closest('.js-nd-range');
    const defaultMin = Number($(rangeWrapper).attr('data-min'));
    const defaultMax = Number($(rangeWrapper).attr('data-max'));
    range.noUiSlider.set([defaultMin, defaultMax]);
    // range.noUiSlider.reset();
  }

  window.globalFunctions.rangeInit = rangeInit;
  window.globalFunctions.resetRange = resetRange;
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
  function getFormattedDate(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}-${month}-${day}`;
  }

  function setFormattedDate(date) {
    let result = '';
    if (date) {
      const parts = date.split('-');
      const year = parts[0];
      const month = parts[1] - 1;
      const day = parts[2];
      result = new Date(year, month, day, 0, 0);
    }

    return result;
  }

  function simpleDatepickerInit(el) {
    const disabledDates = $(el).attr('data-disabled-dates') ? $(el).attr('data-disabled-dates').split(',') : [];
    const minDateParam = $(el).attr('data-mindate');
    const maxDateParam = $(el).attr('data-maxdate');
    const startDateParam = $(el).attr('data-startdate');
    const classList = $(el).attr('data-class-list');
    let startDate = new Date();
    let minDate = new Date();
    if (minDateParam === 'all') {
      minDate = '';
    } else if (minDateParam !== undefined) {
      minDate = setFormattedDate(minDateParam);
    }
    if (startDateParam !== undefined) {
      startDate = setFormattedDate(startDateParam);
    }
    const maxDate = maxDateParam !== undefined ? setFormattedDate(maxDateParam) : '';
    const popupClass = $(el).closest('.popup, .nd-popup').length > 0 ? 'datepicker_fancybox' : '';
    const addClasses = `${classList} ${popupClass}`;

    if ($('.datepicker-overlay').length === 0) {
      $('.datepicker').after('<div class="datepicker-overlay"></div>');
    }

    $(el).datepicker({
      language: 'en',
      dateFormat: 'dd MM yyyy',
      autoClose: true,
      disableNavWhenOutOfRange: true,
      minDate,
      maxDate,
      startDate,
      classes: addClasses,
      onSelect(a, b, inst) {
        const self = inst.el;
        $(self).trigger('change');
        window.setLabelPosition(self);
      },
      onShow() {
        const leftEl = $(el).offset().left;
        const width = $(el).outerWidth() / 2;
        const widthDp = $('.datepicker').outerWidth() / 2;
        $('.datepicker').offset({ left: leftEl + width - widthDp });
        $('body').addClass('is-air-datepicker-open');
        if ($('.datepicker-overlay').length === 0) {
          $('.datepicker').after('<div class="datepicker-overlay"></div>');
        }
      },
      onHide() {
        $('body').removeClass('is-air-datepicker-open');
      },
      onRenderCell(d, type) {
        let disabled = false;
        const formatted = getFormattedDate(d);

        if (type === 'day') {
          disabled = disabledDates.filter((date) => (date === formatted)).length;
        }

        return {
          disabled,
        };
      },
      onChangeMonth() {
        const leftEl = $(el).offset().left;
        const width = $(el).outerWidth() / 2;
        const widthDp = $('.datepicker').outerWidth() / 2;
        $('.datepicker').offset({ left: leftEl + width - widthDp });
      },
      onChangeYear() {
        const leftEl = $(el).offset().left;
        const width = $(el).outerWidth() / 2;
        const widthDp = $('.datepicker').outerWidth() / 2;
        $('.datepicker').offset({ left: leftEl + width - widthDp });
      },
      onChangeDecade() {
        const leftEl = $(el).offset().left;
        const width = $(el).outerWidth() / 2;
        const widthDp = $('.datepicker').outerWidth() / 2;
        $('.datepicker').offset({ left: leftEl + width - widthDp });
      },
      onChangeView() {
        const leftEl = $(el).offset().left;
        const width = $(el).outerWidth() / 2;
        const widthDp = $('.datepicker').outerWidth() / 2;
        $('.datepicker').offset({ left: leftEl + width - widthDp });
      },
    });
  }

  window.simpleDatepickerInit = simpleDatepickerInit;

  function changedDatepickerInit(el) {
    const disabledDates = $(el).attr('data-disabled-dates') ? $(el).attr('data-disabled-dates').split(',') : [];
    const minDateParam = $(el).attr('data-mindate');
    const maxDateParam = $(el).attr('data-maxdate');
    const startDateParam = $(el).attr('data-startdate');
    const classList = $(el).attr('data-class-list');
    let startDate = new Date();
    let minDate = new Date();
    if (minDateParam === 'all') {
      minDate = '';
    } else if (minDateParam !== undefined) {
      minDate = setFormattedDate(minDateParam);
    }
    if (startDateParam !== undefined) {
      startDate = setFormattedDate(startDateParam);
    }
    const maxDate = maxDateParam !== undefined ? setFormattedDate(maxDateParam) : '';
    const popupClass = $(el).closest('.popup, .nd-popup').length > 0 ? 'datepicker_fancybox' : '';
    const addClasses = `${classList} ${popupClass}`;

    if ($('.datepicker-overlay').length === 0) {
      $('.datepicker').after('<div class="datepicker-overlay"></div>');
    }

    $(el).datepicker({
      language: 'en',
      dateFormat: 'yyyy-mm-dd',
      autoClose: true,
      position: 'bottom right',
      showEvent: 'click',
      classes: addClasses,
      minDate,
      maxDate,
      startDate,
      onSelect(a, b, inst) {
        const date = b;
        const self = inst.el;
        const copyfield = $(el).siblings('[data-copy-date]');
        const stringDate = `${date.getDate()} ${$.fn.datepicker.language.en.monthsShort[date.getMonth()]} ${date.getFullYear()}`;
        $(copyfield).text(stringDate);
        $(self).trigger('change');
        window.setLabelPosition(self);
      },
      onShow() {
        const leftEl = $(el).offset().left;
        const width = $(el).outerWidth() / 2;
        const widthDp = $('.datepicker').outerWidth() / 2;
        $('.datepicker').offset({ left: leftEl + width - widthDp });
        $('body').addClass('is-air-datepicker-open');
        if ($('.datepicker-overlay').length === 0) {
          $('.datepicker').after('<div class="datepicker-overlay"></div>');
        }
      },
      onHide() {
        $('body').removeClass('is-air-datepicker-open');
      },
      onRenderCell(d, type) {
        let disabled = false;
        const formatted = getFormattedDate(d);
        if (type === 'day') {
          disabled = disabledDates.filter((date) => (date === formatted)).length;
        }

        return {
          disabled,
        };
      },
      onChangeMonth() {
        const leftEl = $(el).offset().left;
        const width = $(el).outerWidth() / 2;
        const widthDp = $('.datepicker').outerWidth() / 2;
        $('.datepicker').offset({ left: leftEl + width - widthDp });
      },
      onChangeYear() {
        const leftEl = $(el).offset().left;
        const width = $(el).outerWidth() / 2;
        const widthDp = $('.datepicker').outerWidth() / 2;
        $('.datepicker').offset({ left: leftEl + width - widthDp });
      },
      onChangeDecade() {
        const leftEl = $(el).offset().left;
        const width = $(el).outerWidth() / 2;
        const widthDp = $('.datepicker').outerWidth() / 2;
        $('.datepicker').offset({ left: leftEl + width - widthDp });
      },
      onChangeView() {
        const leftEl = $(el).offset().left;
        const width = $(el).outerWidth() / 2;
        const widthDp = $('.datepicker').outerWidth() / 2;
        $('.datepicker').offset({ left: leftEl + width - widthDp });
      },
    });
  }

  window.changedDatepickerInit = changedDatepickerInit;

  $('.js-datepicker').each((i, el) => {
    const disabledDates = $(el).attr('data-disabled-dates') ? $(el).attr('data-disabled-dates').split(',') : [];
    const minDateParam = $(el).attr('data-mindate');
    const maxDateParam = $(el).attr('data-maxdate');
    const startDateParam = $(el).attr('data-startdate');
    const classList = $(el).attr('data-class-list');
    let minDate = new Date();
    let startDate = new Date();
    if (minDateParam === 'all') {
      minDate = '';
    } else if (minDateParam !== undefined) {
      minDate = setFormattedDate(minDateParam);
    }
    if (startDateParam !== undefined) {
      startDate = setFormattedDate(startDateParam);
    }
    const maxDate = maxDateParam !== undefined ? setFormattedDate(maxDateParam) : '';
    const popupClass = $(el).closest('.popup, .nd-popup').length > 0 ? 'datepicker_fancybox' : '';
    const addClasses = `${classList} ${popupClass}`;

    $(el).datepicker({
      language: 'en',
      dateFormat: 'dd MM yyyy',
      firstDay: 1,
      autoClose: true,
      minDate,
      maxDate,
      startDate,
      classes: addClasses,
      navTitles: {
        days: 'MM yyyy',
        months: 'yyyy',
        years: 'yyyy1 - yyyy2',
      },
      onSelect(a, b, inst) {
        const self = inst.el;
        $(self).trigger('change');
        window.setLabelPosition(self);
      },
      onShow() {
        const leftEl = $(el).offset().left;
        const width = $(el).outerWidth() / 2;
        const widthDp = $('.datepicker').outerWidth() / 2;
        $('.datepicker').offset({ left: leftEl + width - widthDp });
        $('body').addClass('is-air-datepicker-open');
        if ($('.datepicker-overlay').length === 0) {
          $('.datepicker').after('<div class="datepicker-overlay"></div>');
        }
      },
      onHide() {
        $('body').removeClass('is-air-datepicker-open');
      },
      onRenderCell(d, type) {
        let disabled = false;
        const formatted = getFormattedDate(d);

        if (type === 'day') {
          disabled = disabledDates.filter((date) => (date === formatted)).length;
        }

        return {
          disabled,
        };
      },
      onChangeMonth() {
        const leftEl = $(el).offset().left;
        const width = $(el).outerWidth() / 2;
        const widthDp = $('.datepicker').outerWidth() / 2;
        $('.datepicker').offset({ left: leftEl + width - widthDp });
      },
      onChangeYear() {
        const leftEl = $(el).offset().left;
        const width = $(el).outerWidth() / 2;
        const widthDp = $('.datepicker').outerWidth() / 2;
        $('.datepicker').offset({ left: leftEl + width - widthDp });
      },
      onChangeDecade() {
        const leftEl = $(el).offset().left;
        const width = $(el).outerWidth() / 2;
        const widthDp = $('.datepicker').outerWidth() / 2;
        $('.datepicker').offset({ left: leftEl + width - widthDp });
      },
      onChangeView() {
        const leftEl = $(el).offset().left;
        const width = $(el).outerWidth() / 2;
        const widthDp = $('.datepicker').outerWidth() / 2;
        $('.datepicker').offset({ left: leftEl + width - widthDp });
      },
    });
  });

  $('.js-datepicker2').each((i, el) => {
    const disabledDates = $(el).attr('data-disabled-dates') ? $(el).attr('data-disabled-dates').split(',') : [];
    const minDateParam = $(el).attr('data-mindate');
    const maxDateParam = $(el).attr('data-maxdate');
    const startDateParam = $(el).attr('data-startdate');
    const classList = $(el).attr('data-class-list');
    let startDate = new Date();
    let minDate = new Date();
    if (minDateParam === 'all') {
      minDate = '';
    } else if (minDateParam !== undefined) {
      minDate = setFormattedDate(minDateParam);
    }
    if (startDateParam !== undefined) {
      startDate = setFormattedDate(startDateParam);
    }
    const maxDate = maxDateParam !== undefined ? setFormattedDate(maxDateParam) : '';
    const popupClass = $(el).closest('.popup, .nd-popup').length > 0 ? 'datepicker_fancybox' : '';
    const addClasses = `${classList} ${popupClass}`;

    $(el).datepicker({
      language: 'en',
      dateFormat: 'MM d, yyyy',
      autoClose: true,
      minDate,
      maxDate,
      startDate,
      classes: addClasses,
      onSelect(a, b, inst) {
        const self = inst.el;
        $(self).trigger('change');
        window.setLabelPosition(self);
      },
      onShow() {
        const leftEl = $(el).offset().left;
        const width = $(el).outerWidth() / 2;
        const widthDp = $('.datepicker').outerWidth() / 2;
        $('.datepicker').offset({ left: leftEl + width - widthDp });
        $('body').addClass('is-air-datepicker-open');

        if ($('.datepicker-overlay').length === 0) {
          $('.datepicker').after('<div class="datepicker-overlay"></div>');
        }
      },
      onHide() {
        $('body').removeClass('is-air-datepicker-open');
      },
      onRenderCell(d, type) {
        let disabled = false;
        const formatted = getFormattedDate(d);

        if (type === 'day') {
          disabled = disabledDates.filter((date) => (date === formatted)).length;
        }

        return {
          disabled,
        };
      },
      onChangeMonth() {
        const leftEl = $(el).offset().left;
        const width = $(el).outerWidth() / 2;
        const widthDp = $('.datepicker').outerWidth() / 2;
        $('.datepicker').offset({ left: leftEl + width - widthDp });
      },
      onChangeYear() {
        const leftEl = $(el).offset().left;
        const width = $(el).outerWidth() / 2;
        const widthDp = $('.datepicker').outerWidth() / 2;
        $('.datepicker').offset({ left: leftEl + width - widthDp });
      },
      onChangeDecade() {
        const leftEl = $(el).offset().left;
        const width = $(el).outerWidth() / 2;
        const widthDp = $('.datepicker').outerWidth() / 2;
        $('.datepicker').offset({ left: leftEl + width - widthDp });
      },
      onChangeView() {
        const leftEl = $(el).offset().left;
        const width = $(el).outerWidth() / 2;
        const widthDp = $('.datepicker').outerWidth() / 2;
        $('.datepicker').offset({ left: leftEl + width - widthDp });
      },
    });
  });

  $('.js-change-date').each((i, el) => {
    changedDatepickerInit(el);
  });

  $('.js-days-calendar').each(function () {
    const el = $(this);
    const disabledDates = $(el).attr('data-disabled-dates') ? $(el).attr('data-disabled-dates').split(',') : [];
    const minDateParam = $(el).attr('data-mindate');
    const maxDateParam = $(el).attr('data-maxdate');
    let minDate = new Date();
    if (minDateParam === 'all') {
      minDate = '';
    } else if (minDateParam !== undefined) {
      minDate = setFormattedDate(minDateParam);
    }
    const maxDate = maxDateParam !== undefined ? setFormattedDate(maxDateParam) : '';
    /* eslint-disable consistent-return */
    el.datepicker({
      classes: 'calendar__grid',
      language: 'en',
      dateFormat: 'dd MM yyyy',
      inline: true,
      minDate,
      maxDate,
      navTitles: {
        days: '<span data-month="data-month">m</span><span data-year="data-year">yyyy</span>',
      },
      moveToOtherYearsOnSelect: false,
      selectOtherYears: false,
      selectOtherMonths: false,
      altField: '[data-calendar-output]',
      altFieldDateFormat: 'yyyy-mm-dd',
      onRenderCell(date, cellType) {
        let disabled = false;
        const formatted = getFormattedDate(date);

        if (cellType === 'day') {
          disabled = disabledDates.filter((dt) => (dt === formatted)).length;

          return {
            html: `<span>${date.getDate()}</span>`,
            disabled,
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

  $(document).on('change', '[data-period-start]', (evt) => {
    const self = evt.currentTarget;
    const name = $(self).attr('data-period-start');
    const end = $(`[data-period-end="${name}"]`);
    const datepickerstart = $(self).datepicker().data('datepicker');
    const datepickerend = $(end).datepicker().data('datepicker');
    const newStart = datepickerstart.selectedDates[0];
    $(end).attr('data-mindate', `${newStart.getFullYear()}-${newStart.getMonth() + 1}-${newStart.getDate()}`);
    datepickerend.update({
      minDate: newStart,
    });
    $(end).val('');
    $(end).trigger('change');
    window.setLabelPosition(end);
    $(end).siblings('[data-copy-date]').text('');
  });
}
