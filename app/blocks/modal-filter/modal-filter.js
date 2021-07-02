import { uid } from 'uid';
import createTag from './create-tag';

const { $ } = window;

export default function modalFilter() {
  const modalFilterMethods = {
    open() {
      $('#modal-filter').addClass('is-opened');
    },
    close() {
      $('#modal-filter').removeClass('is-opened');
    },
    getTag(id) {
      return document.querySelector(`[data-modal-filter-target-id="${id}"]`);
    },
    getItem(id) {
      return document.querySelector(`[data-modal-filter-item-id="${id}"]`);
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
      const applyButtons = document.querySelectorAll('.js-apply-modal-filter');
      switch (state) {
        case 'reset': {
          clearButtons.forEach((el) => {
            if (!el.getAttribute('data-modal-filter-clear-always')) {
              el.setAttribute('disabled', 'disabled');
            }
          });

          applyButtons.forEach((el) => {
            el.classList.add('is-hidden');
          });
          break;
        }
        default: {
          clearButtons.forEach((el) => {
            el.removeAttribute('disabled');
          });

          applyButtons.forEach((el) => {
            el.classList.remove('is-hidden');
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
          output.forEach((el) => {
            const tg = el;
            tg.innerText = count;
            const modalOutput = tg.closest('.modal-output');
            if (modalOutput) {
              modalOutput.classList.add('is-filled');
            }
          });
          modalFilterMethods.buttonsState('apply');
          break;
        }
      }
    },
    setValue(el) {
      const name = el.getAttribute('data-modal-filter-item');
      const tagId = el.getAttribute('data-modal-filter-item-id');
      const tagsEl = document.querySelector('[data-modal-filter-tags]');
      if (tagId) {
        const tag = modalFilterMethods.getTag(tagId);
        if (modalFilterMethods.isRange(el)) {
          const isResetRange = modalFilterMethods.isRangeReset(el);
          if (isResetRange) {
            el.removeAttribute('data-modal-filter-item-id');
            tag.remove();
          } else {
            const value = modalFilterMethods.getRangeValues(el, name);
            const text = tag ? tag.querySelector('[data-modal-filter-tag-text]') : undefined;
            if (text) {
              text.innerText = value;
            }
          }
        } else if (!el.checked) {
          el.removeAttribute('data-modal-filter-item-id');
          tag.remove();
        }
      } else if (modalFilterMethods.isRange(el)) {
        const isResetRange = modalFilterMethods.isRangeReset(el);
        if (!isResetRange) {
          const value = modalFilterMethods.getRangeValues(el, name);
          const id = `${name}-${uid()}`;
          const data = {
            id,
            text: value,
          };
          const tag = createTag(data);
          tagsEl.append(tag);
          el.setAttribute('data-modal-filter-item-id', id);
        }
      } else {
        const { value } = el;
        const id = `${name}-${uid()}`;
        const data = {
          id,
          text: value,
        };
        const tag = createTag(data);
        tagsEl.append(tag);
        el.setAttribute('data-modal-filter-item-id', id);
      }
    },
    resetValueByTag(tag) {
      const tagId = tag.getAttribute('data-modal-filter-target-id');
      if (tagId !== undefined) {
        const item = modalFilterMethods.getItem(tagId);
        if (item) {
          if (modalFilterMethods.isRange(item)) {
            const range = item.querySelector('[data-nd-range-container]');
            if (range) {
              window.globalFunctions.resetRange(range);
            }
          } else {
            item.checked = false;
          }
          item.removeAttribute('data-modal-filter-item-id');
        }
      }
      tag.remove();
    },
    resetAll() {
      const tags = document.querySelectorAll('.js-modal-filter-remove-tag');
      if (tags) {
        tags.forEach((el) => {
          modalFilterMethods.resetValueByTag(el);
        });
        modalFilterMethods.toggleStates('reset');
      }
    },
    presetFilter() {
      const items = document.querySelectorAll('[data-modal-filter-item]');
      if (items) {
        items.forEach((el) => {
          if (modalFilterMethods.isRange(el) || el.checked) {
            modalFilterMethods.setValue(el);
          }
        });
        modalFilterMethods.applyFilter();
      }
    },
    applyFilter() {
      const items = document.querySelectorAll('.modal-filter-option');
      if (items) {
        const count = items.length;
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

  const tags = document.querySelector('[data-modal-filter-tags]');

  if (tags) {
    modalFilterMethods.toggleButtonsStates(tags);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        const el = mutation.target;
        modalFilterMethods.toggleButtonsStates(el);
      });
    });

    observer.observe(tags, { childList: true });
  }

  $(document).on('click', '.js-open-modal-filter', modalFilterMethods.open);

  $(document).on('click', '.js-close-modal-filter', modalFilterMethods.close);

  $(document).on('click', (evt) => {
    if (!(evt.target.closest('.modal-filter') || evt.target.closest('.js-open-modal-filter') || evt.target.closest('.js-modal-filter-remove-tag'))) {
      modalFilterMethods.close();
    }
  });

  $(document).on('change', '[data-modal-filter-item]', (evt) => {
    const el = evt.currentTarget;
    modalFilterMethods.setValue(el);
  });

  $(document).on('click', '.js-modal-filter-remove-tag', (evt) => {
    evt.preventDefault();
    const el = evt.currentTarget;
    modalFilterMethods.resetValueByTag(el);
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
