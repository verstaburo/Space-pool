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
    }

    modalItemMethods.setValue(_this);
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
