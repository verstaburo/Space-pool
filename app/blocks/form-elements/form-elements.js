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
        const classNames = this.config.classNames;
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
        window.globalFunctions.scrollbarLightGray(newScrollWrapper);
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
        containerOuter: additionalClasses,
        titleText: title,
      },
      sorter,
      callbackOnCreateTemplates(template) {
        const classNames = this.config.classNames;
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
        window.globalFunctions.scrollbarLightGray(newScrollWrapper);
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
          const classNames = this.config.classNames;
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
          window.globalFunctions.scrollbarDark(newScrollWrapper);
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
          const classNames = this.config.classNames;
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
          window.globalFunctions.scrollbarBold(newScrollWrapper);
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
          const classNames = this.config.classNames;
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
          window.globalFunctions.scrollbarBold(newScrollWrapper);
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
          const classNames = this.config.classNames;
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
          window.globalFunctions.scrollbarLight(newScrollWrapper);
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
          const classNames = this.config.classNames;
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
          window.globalFunctions.scrollbarLight(newScrollWrapper);
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
          const classNames = this.config.classNames;
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
          window.globalFunctions.scrollbarLight(newScrollWrapper);
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

  // добавляем состояние сделанного выбора у списков
  if ($('select').length) {
    $('select').each((i, el) => {
      const value = el.value;
      const container = $(el).closest('.choices');
      // if (value !== 'placeholder' && container.length > 0) {
      if (value !== '' && container.length > 0) {
        $(container).addClass('is-item-select');
      } else {
        $(container).removeClass('is-item-select');
      }
    });

    $(document).on('change', 'select', (evt) => {
      const self = evt.target;
      const value = self.value;
      const container = $(self).closest('.choices');
      // if (value !== 'placeholder' && container.length > 0) {
      if (value !== '' && container.length > 0) {
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

  $(document).on('click', '.js-select-close', (evt) => {
    evt.preventDefault();
    const self = evt.currentTarget;
    self.choices.hideDropdown();
  });

  $(document).on('showDropdown', 'select', (evt) => {
    const self = evt.currentTarget;
    const popup = $(self).closest('.popup');
    const advansedFilter = $(self).closest('.advanced-filter');
    if (window.Modernizr.mq(`(max-width: ${window.globalOptions.sizes.sm - 1}px)`)) {
      $(popup).addClass('is-select-opened');
      $(advansedFilter).addClass('is-select-opened');
      window.globalFunctions.freeze();
    }
  });
  $(document).on('hideDropdown', 'select', (evt) => {
    const self = evt.currentTarget;
    const popup = $(self).closest('.popup');
    const advansedFilter = $(self).closest('.advanced-filter');
    if (window.Modernizr.mq(`(max-width: ${window.globalOptions.sizes.sm - 1}px)`)) {
      $(popup).removeClass('is-select-opened');
      $(advansedFilter).removeClass('is-select-opened');
      window.globalFunctions.unfreeze();
    }
  });
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
    const addClasses = $(el).closest('.popup').length > 0 ? 'datepicker_fancybox' : '';

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
      onRenderCell(d, type) {
        let disabled = false;
        const formatted = getFormattedDate(d);

        if (type === 'day') {
          disabled = disabledDates.filter(date => (date === formatted)).length;
        }

        return {
          disabled,
        };
      },
    });
  }

  window.simpleDatepickerInit = simpleDatepickerInit;

  function changedDatepickerInit(el) {
    const disabledDates = $(el).attr('data-disabled-dates') ? $(el).attr('data-disabled-dates').split(',') : [];
    const minDateParam = $(el).attr('data-mindate');
    const maxDateParam = $(el).attr('data-maxdate');
    const startDateParam = $(el).attr('data-startdate');
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
    const addClasses = $(el).closest('.popup').length > 0 ? 'datepicker_fancybox' : '';

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
      onRenderCell(d, type) {
        let disabled = false;
        const formatted = getFormattedDate(d);
        if (type === 'day') {
          disabled = disabledDates.filter(date => (date === formatted)).length;
        }

        return {
          disabled,
        };
      },
    });
  }

  window.changedDatepickerInit = changedDatepickerInit;

  $('.js-datepicker').each((i, el) => {
    const disabledDates = $(el).attr('data-disabled-dates') ? $(el).attr('data-disabled-dates').split(',') : [];
    const minDateParam = $(el).attr('data-mindate');
    const maxDateParam = $(el).attr('data-maxdate');
    const startDateParam = $(el).attr('data-startdate');
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
    const addClasses = $(el).closest('.popup').length > 0 ? 'datepicker_fancybox' : '';

    $(el).datepicker({
      language: 'en',
      dateFormat: 'dd MM yyyy',
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
      onRenderCell(d, type) {
        let disabled = false;
        const formatted = getFormattedDate(d);

        if (type === 'day') {
          disabled = disabledDates.filter(date => (date === formatted)).length;
        }

        return {
          disabled,
        };
      },
    });
  });

  $('.js-datepicker2').each((i, el) => {
    const disabledDates = $(el).attr('data-disabled-dates') ? $(el).attr('data-disabled-dates').split(',') : [];
    const minDateParam = $(el).attr('data-mindate');
    const maxDateParam = $(el).attr('data-maxdate');
    const startDateParam = $(el).attr('data-startdate');
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
    const addClasses = $(el).closest('.popup').length > 0 ? 'datepicker_fancybox' : '';

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
      onRenderCell(d, type) {
        let disabled = false;
        const formatted = getFormattedDate(d);

        if (type === 'day') {
          disabled = disabledDates.filter(date => (date === formatted)).length;
        }

        return {
          disabled,
        };
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
          disabled = disabledDates.filter(dt => (dt === formatted)).length;

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
    input[0].focus();
  });

  $(document).on('keyup change', '.js-numberbox-input', function () {
    const min = parseInt($(this).attr('data-min'), 10) || 0;
    const max = parseInt($(this).attr('data-max'), 10) || false;
    this.value = this.value.replace(/[^\d]/, '');
    if ($(this).val() < min) $(this).val(min);
    if (max && $(this).val() > max) $(this).val(max);
    this.focus();
  });
}

// автосайз для textarea
export function textareaAutosize() {
  function autosizeAll(elements) {
    const el = elements || $('.textarea').not('.no-sm-autosize');
    autosize(el);
  }

  function smnoAutosize() {
    if (window.Modernizr.mq(`(max-width: ${window.globalOptions.sizes.sm - 1}px)`)) {
      autosize.destroy($('.textarea.no-sm-autosize'));
    } else {
      autosize($('.textarea.no-sm-autosize'));
    }
  }

  autosizeAll();
  smnoAutosize();

  window.autosizeTextarea = autosizeAll;

  $(window).on('resize', smnoAutosize);
}
