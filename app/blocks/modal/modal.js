import { modalMethods } from '../modals/modals';

/* eslint-disable max-len */
const { $ } = window;

export default function outputValuesFromModal() {
  const modalItemMethods = {
    setValue(item) {
      const isRange = $(item).is('.js-nd-range');
      const outputName = $(item).attr('data-modal-item-type');
      const outputEl = $(`[data-modal-output-type="${outputName}"]`);
      const outputTarget = $(outputEl).find('[data-modal-output-value]');
      const isChecked = item.checked;
      if (!isRange && isChecked) {
        const value = $(item).attr('data-modal-item-value');
        const wrapperClass = $(item).attr('data-modal-item-wrapper-class');
        const result = wrapperClass ? `<span class="${wrapperClass}">${value}</span>` : value;
        $(outputTarget).empty();
        $(outputTarget).append(result);
        $(outputEl).addClass('is-selected');
      } else if (!isRange && !isChecked) {
        $(outputTarget).empty();
        $(outputEl).removeClass('is-selected');
      } else {
        const range = $(item).find('[data-nd-range-container]').get(0);
        const value = range.noUiSlider.get();
        const defaultMin = Number($(item).attr('data-min'));
        const defaultMax = Number($(item).attr('data-max'));
        let result = '';
        if (defaultMin === Math.trunc(value[0]) && defaultMax === Math.trunc(value[1])) {
          $(outputEl).removeClass('is-selected');
          $(outputTarget).empty();
        } else if (defaultMin === Math.trunc(value[0]) && defaultMax > Math.trunc(value[1])) {
          result = `< ${Math.trunc(value[1])}`;
        } else if (defaultMin < Math.trunc(value[0]) && defaultMax === Math.trunc(value[1])) {
          result = `${Math.trunc(value[0])}+`;
        } else {
          result = `${Math.trunc(value[0])} - ${Math.trunc(value[1])}`;
        }

        if (result) {
          $(outputTarget).empty();
          $(outputTarget).text(result);
          $(outputEl).addClass('is-selected');
        } else {
          $(outputEl).removeClass('is-selected');
          $(outputTarget).empty();
        }
      }
    },
    setDateValue(items) {
      const outputName = $(items).attr('data-modal-item-type');
      const outputEl = $(`[data-modal-output-type="${outputName}"]`);
      const outputTarget = $(outputEl).find('[data-modal-output-value]');
      let result = '';

      $(items).each((i, el) => {
        if (i === 2 && el.value) {
          result += `- ${el.value}`;
        } else {
          result += `${el.value} `;
        }
      });

      if (result) {
        $(outputTarget).empty();
        $(outputTarget).text(result.trim());
        $(outputEl).addClass('is-selected');
      } else {
        $(outputEl).removeClass('is-selected');
        $(outputTarget).empty();
      }
    },
    resetValues(form) {
      const modals = $(form).find('.modal').toArray();
      const modalIds = modals.map((el) => el.getAttribute('id'));
      modalIds.forEach((el) => {
        const output = $(`[data-modal-target="${el}"]`);
        const valueEl = $(output).find('[data-modal-output-value]');
        $(output).removeClass('is-selected');
        $(valueEl).empty();
      });
    },
    resetValue(modalId) {
      const modal = $(`#${modalId}`);
      const range = $(modal).find('.js-nd-range');
      const isRange = range.length;
      const items = $(modal).find('[data-modal-item]').not('.js-nd-range');
      const isOpen = $(modal).hasClass('is-opened');
      const isItems = items.length;
      if (isRange) {
        const rangeContainer = $(range).find('[data-nd-range-container]').get(0);
        window.globalFunctions.resetRange(rangeContainer);
      }

      if (isItems) {
        $(items).each((i, el) => {
          const elType = $(el).attr('type');

          if (elType === 'radio' || elType === 'checkbox') {
            $(el).prop('checked', false);
            $(el).removeAttr('checked');
          } else if ($(el).is('select')) {
            const container = $(el).closest('.choices, .nd-choices');
            el.choices.removeActiveItems();
            $(container).removeClass('is-item-select');
          } else if ($(el).is('[data-datepicker-output]')) {
            const datepicker = $(modal).find('.js-inline-datepicker');
            $(datepicker).datepicker().data('datepicker').clear();
          } else {
            $(el).val('');
          }
        });
      }

      const output = $(`[data-modal-target="${modalId}"]`);
      const valueEl = $(output).find('[data-modal-output-value]');
      $(output).removeClass('is-selected');
      $(valueEl).empty();
      if (isOpen) {
        modalMethods.close(modalId);
      }
    },
  };

  const modalItems = $('[data-modal-item]:checked');
  modalItems.each((i, el) => modalItemMethods.setValue(el));

  window.globalFunctions.modalItemMethods = modalItemMethods;

  const dates = $('[data-modal-item-type="date"]').filter((i, el) => $(el).is('[data-modal-item]'));

  modalItemMethods.setDateValue(dates);

  $(document).on('change', '[data-modal-item]', (evt) => {
    const _this = evt.currentTarget;
    const isRange = $(_this).is('.js-nd-range');
    const isDate = $(_this).is('[data-modal-item-type="date"]');
    if (!isRange && !isDate) {
      modalMethods.closeAll();

      const { form } = _this;
      const formId = $(form).attr('id');
      const resetButton = $(`.js-sr-filter-reset[form="${formId}"]`);
      $(resetButton).removeAttr('disabled');
      modalItemMethods.setValue(_this);
    }
  });

  $(document).on('click', '.js-modal-set-value', (evt) => {
    const _this = evt.currentTarget;
    const modal = $(_this).closest('.modal');
    const modalId = $(modal).attr('id');
    const items = $(modal).find('[data-modal-item]');
    $(modal).find('.js-modal-reset-value').removeAttr('disabled');
    let item = null;
    if (items.length > 1) {
      item = $(modal).find('[data-modal-item]:checked').get(0);
    } else {
      const isRange = $(items).is('.js-nd-range');
      if (isRange) {
        item = $(items).get(0);
      } else {
        item = $(items).is('[data-modal-item]:checked') ? $(items).get(0) : null;
      }
    }

    if (item) {
      modalItemMethods.setValue(item);
      modalMethods.close(modalId);
    } else if (modalId === 'filter-date') {
      modalItemMethods.setDateValue(items);
      modalMethods.close(modalId);
    }
  });

  $(document).on('click', '.js-modal-reset-value', (evt) => {
    const _this = evt.currentTarget;
    const modal = $(_this).closest('.modal');
    const modalId = $(modal).attr('id');
    modalItemMethods.resetValue(modalId);
  });

  $(document).on('click', '.js-sr-filter-reset', (evt) => {
    const _this = evt.currentTarget;
    const { form } = _this;
    if (form) {
      modalItemMethods.resetValues(form);
    }
    $(_this).attr('disabled', 'disabled');
  });

  $(document).on('click', '.js-reset-current-modal', (evt) => {
    evt.preventDefault();
    const res = evt.currentTarget;
    const output = res.closest('.modal-output');
    if (output) {
      const modalId = output.getAttribute('data-modal-target');
      modalItemMethods.resetValue(modalId);
    }
  });
}
/* eslint-enable max-len */
