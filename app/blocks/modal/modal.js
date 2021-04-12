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
      const isItems = items.length;
      if (isRange) {
        const rangeContainer = $(range).find('[data-nd-range-container]').get(0);
        window.globalFunctions.resetRange(rangeContainer);
      }

      if (isItems) {
        $(items).each((i, el) => {
          $(el).prop('checked', false);
          $(el).removeAttr('checked');
        });
      }

      const output = $(`[data-modal-target="${modalId}"]`);
      const valueEl = $(output).find('[data-modal-output-value]');
      $(output).removeClass('is-selected');
      $(valueEl).empty();
      modalMethods.close(modalId);
    },
  };

  const modalItems = $('[data-modal-item]:checked');
  modalItems.each((i, el) => modalItemMethods.setValue(el));

  $(document).on('change', '[data-modal-item]', (evt) => {
    const _this = evt.currentTarget;
    const isRange = $(_this).is('.js-nd-range');
    if (!isRange) {
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
}
/* eslint-enable max-len */
