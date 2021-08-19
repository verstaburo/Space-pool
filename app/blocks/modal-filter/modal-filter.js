// import { uid } from 'uid';
// import createTag from './create-tag';

const { $ } = window;

export default function modalFilter() {
  const modalFilterMethods = {
    open() {
      $('#modal-filter').addClass('is-opened');
    },
    close() {
      $('#modal-filter').removeClass('is-opened');
    },
    getRangeValues(el, name) {
      const range = el.querySelector('[data-nd-range-container]');

      if (!range) return 0;

      const value = range.noUiSlider.get();
      return `${name.charAt(0).toUpperCase() + name.slice(1)} ${Math.trunc(value[0])} - ${Math.trunc(value[1])}`;
    },
    isRange(el) {
      return el.classList.contains('js-nd-range');
    },
    isRangeReset(el) {
      const range = el.querySelector('[data-nd-range-container]');

      if (!range) return true;

      const defaultMax = range.noUiSlider.options.range.max;
      const defaultMin = range.noUiSlider.options.range.min;
      const values = range.noUiSlider.get();

      return (Math.trunc(values[0]) === defaultMin && Math.trunc(values[1]) === defaultMax);
    },
    buttonsState(state) {
      const clearButtons = document.querySelectorAll('.js-clear-modal-filter');
      switch (state) {
        case 'reset': {
          clearButtons.forEach((el) => {
            if (!el.getAttribute('data-modal-filter-clear-always')) {
              el.setAttribute('disabled', 'disabled');
            }
          });
          break;
        }
        default: {
          clearButtons.forEach((el) => {
            el.removeAttribute('disabled');
          });
          break;
        }
      }
    },
    toggleStates(state, count) {
      const output = document.querySelectorAll('[data-modal-filter-output]');
      switch (state) {
        case 'reset': {
          output.forEach((el) => {
            const tg = el;
            tg.innerText = '';
            const modalOutput = tg.closest('.modal-output');
            if (modalOutput) {
              modalOutput.classList.remove('is-filled');
            }
          });
          modalFilterMethods.buttonsState('reset');
          break;
        }
        default: {
          if (count) {
            output.forEach((el) => {
              const tg = el;
              tg.innerText = count;
              const modalOutput = tg.closest('.modal-output');
              if (modalOutput) {
                modalOutput.classList.add('is-filled');
              }
            });

            modalFilterMethods.buttonsState('apply');
          }
          break;
        }
      }
    },
    getCheckedCount(itemsArr) {
      let count = 0;
      itemsArr.forEach((el) => {
        if (modalFilterMethods.isRange(el)) {
          const isResetRange = modalFilterMethods.isRangeReset(el);
          if (isResetRange) {
            count += 0;
          } else {
            count += 1;
          }
        } else {
          count += (el.checked ? 1 : 0);
        }
      });
      return count;
    },
    resetValue(elem) {
      const item = elem;
      if (item) {
        if (modalFilterMethods.isRange(item)) {
          const range = item.querySelector('[data-nd-range-container]');
          if (range) {
            window.globalFunctions.resetRange(range);
          }
        } else {
          item.checked = false;
        }
      }
    },
    resetAll() {
      const items = document.querySelectorAll('[data-modal-filter-item]');
      if (items) {
        items.forEach((el) => {
          modalFilterMethods.resetValue(el);
        });
        modalFilterMethods.toggleStates('reset');
      }
    },
    presetFilter() {
      const items = document.querySelectorAll('[data-modal-filter-item]');
      if (items) {
        modalFilterMethods.applyFilter();
      }
    },
    applyFilter() {
      const items = document.querySelectorAll('[data-modal-filter-item]');
      if (items) {
        const count = modalFilterMethods.getCheckedCount(items);
        modalFilterMethods.toggleStates('apply', count);
      } else {
        modalFilterMethods.toggleStates('reset');
      }
    },
    toggleButtonsStates(tags) {
      if (tags.children.length) {
        modalFilterMethods.buttonsState('apply');
      } else {
        modalFilterMethods.buttonsState('reset');
      }
    },
  };

  window.globalFunctions.modalFilterMethods = modalFilterMethods;

  $(document).on('click', '.js-open-modal-filter', modalFilterMethods.open);

  $(document).on('click', '.js-close-modal-filter', modalFilterMethods.close);

  $(document).on('click', (evt) => {
    if (!(evt.target.closest('.modal-filter') || evt.target.closest('.js-open-modal-filter') || evt.target.closest('.js-modal-filter-remove-tag'))) {
      modalFilterMethods.close();
    }
  });

  $(document).on('click', '.js-clear-modal-filter', (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    modalFilterMethods.resetAll();
    modalFilterMethods.close();
  });

  $(document).on('click', '.js-apply-modal-filter', (evt) => {
    evt.preventDefault();
    modalFilterMethods.applyFilter();
    modalFilterMethods.close();
  });
}
