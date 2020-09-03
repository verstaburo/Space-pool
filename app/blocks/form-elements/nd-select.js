// https://github.com/jshjohnson/Choices
import Choices from 'choices.js';

const $ = window.$;

export default function ndSelects() {
  function srtFunc(a, b) {
    return a.label.localeCompare(b.label, 'en', {
      numeric: true,
    });
  }

  function ndSelectInput(select) {
    const self = select;
    const additionalClasses = $(self).attr('data-choices-classes') || '';
    // const popup = $(self).attr('data-choices-popup') !== undefined ? ' nd-choices_popup' : '';
    const containerClasses = `nd-choices nd-choices_popup ${additionalClasses}`;
    const title = $(self).attr('data-mobile-title') || $(self).find('option[placeholder]').text() || $(self).attr('placeholder') || 'Select';
    const sorter = ($(self).attr('data-no-sort') === undefined) ? srtFunc : undefined;
    const choices = new Choices(self, {
      searchEnabled: true,
      searchPlaceholderValue: 'Search...',
      itemSelectText: '',
      classNames: {
        containerOuter: containerClasses,
        titleText: title,
        containerInner: 'nd-choices__inner',
        input: 'nd-choices__input',
        inputCloned: 'nd-choices__input--cloned',
        list: 'nd-choices__list',
        listItems: 'nd-choices__list--multiple',
        listSingle: 'nd-choices__list--single',
        listDropdown: 'nd-choices__list--dropdown',
        item: 'nd-choices__item',
        itemSelectable: 'nd-choices__item--selectable',
        itemDisabled: 'nd-choices__item--disabled',
        itemChoice: 'nd-choices__item--choice',
        placeholder: 'nd-choices__placeholder',
        group: 'nd-choices__group',
        groupHeading: 'nd-choices__heading',
        button: 'nd-choices__button',
        activeState: 'is-active',
        focusState: 'is-focused',
        openState: 'is-open',
        disabledState: 'is-disabled',
        highlightedState: 'is-highlighted',
        selectedState: 'is-selected',
        flippedState: 'is-flipped',
        loadingState: 'is-loading',
        noResults: 'has-no-results',
        noChoices: 'has-no-choices',
      },
      sorter,
      callbackOnCreateTemplates(template) {
        const classNames = this.config.classNames;
        const result = {};
        result.dropdown = () => template(`
            <div class="${classNames.list} ${classNames.listDropdown}" aria-expanded="false"><div class="nd-choices__header"><div class="nd-choices__close close js-select-close"></div><div class="nd-choices__header-title">${classNames.titleText}</div></div></div>
          `);
        return result;
      },
      callbackOnInit() {
        const sel = this.passedElement.element;
        const main = this.containerOuter.element;
        const formbox = $(select).closest('label');
        // const choiceList = this.choiceList.element;
        // const dropdown = this.dropdown.element;
        // const scrollWrapper = document.createElement('div');
        // scrollWrapper.classList.add('choices__scrollblock');
        // $(choiceList).wrap(scrollWrapper);
        // const newScrollWrapper = $(dropdown).find('.choices__scrollblock');
        // window.globalFunctions.scrollbarLightGray(newScrollWrapper, true);
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

  window.ndSelectInput = ndSelectInput;

  if ($('.js-nd-select').length > 0) {
    $('.js-nd-select').each((i, el) => {
      ndSelectInput(el);
    });
  }

  /* eslint-disable no-unused-vars */
  // добавляем состояние сделанного выбора у списков
  if ($('select').length) {
    $('select').each((i, el) => {
      const value = el.value;
      const container = $(el).closest('.choices, .nd-choices');
      if (value !== '' && container.length > 0) {
        $(container).addClass('is-item-select');
      } else {
        $(container).removeClass('is-item-select');
      }
    });

    $(document).on('change', 'select', (evt) => {
      const self = evt.target;
      const value = self.value;
      const container = $(self).closest('.choices, .nd-choices');
      if (value !== '' && container.length > 0) {
        $(container).addClass('is-item-select');
      } else {
        $(container).removeClass('is-item-select');
      }
    });

    $(document).on('showDropdown', 'select', (evt) => {
      const self = evt.currentTarget;
      const input = self.choices.input.element;
      if (window.Modernizr.mq(`(min-width: ${window.globalOptions.sizes.sm}px)`)) {
        setTimeout(() => {
          input.focus();
        }, 20);
      }
      $('body').addClass('is-choices-dropdown-showed');
    });

    $(document).on('hideDropdown', 'select', (evt) => {
      const self = evt.currentTarget;
      const cho = self.choices;
      const chs = cho.containerOuter.element;
      const input = cho.input.element;
      $('body').removeClass('is-choices-dropdown-showed');
      if (window.Modernizr.mq(`(min-width: ${window.globalOptions.sizes.sm}px)`)) {
        cho.clearInput();
        window.setLabelPosition(input);
        // chs.focus();
      }
    });
  }

  // следим чтобы не вылезали за правую границу страницы
  function sideOpen() {
    $('.choices, .nd-choices').each((i, el) => {
      const self = el;
      const dropdown = $(el).find('.choices__list--dropdown, .nd-choices__list--dropdown');
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
