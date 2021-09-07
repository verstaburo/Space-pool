/* eslint-disable no-unused-vars */
import requestTimeout from '../../scripts/functions/requestTimeout';

const { $ } = window;
const bp = window.globalOptions.ndsizes;
const noop = () => { };

export const modalMethods = {
  closeAll() {
    const modals = $('.modal');
    modals.each((i, el) => {
      const isOpened = $(el).hasClass('is-opened');
      if (isOpened) {
        const modalId = $(el).attr('id');
        modalMethods.close(modalId);
      }
    });
  },
  closeScrollAll() {
    if (window.matchMedia(`(min-width: ${bp.sm}px)`).matches) {
      modalMethods.closeAll();
    }
  },
  open(id, source) {
    modalMethods.closeAll();
    const modal = $(`#${id}`);
    const modalOutput = $(`.modal-output[data-modal-target="${id}"]`);
    modalMethods.calculatePosition(modal.get(0), source);
    modal.addClass('is-opened is-animated');
    modal.trigger('MODAL_BEFORE_SHOWN');
    modalOutput.addClass('is-opened');
    let cancel = noop;
    function regCancel(fn) {
      cancel = fn;
    }
    requestTimeout(() => {
      modal.removeClass('is-animated');
      modal.trigger('MODAL_AFTER_SHOWN');
    }, 300, regCancel, noop);
    $('body').currentActiveModal = $(modal).get(0);
  },
  close(id) {
    $('body').currentActiveModal = null;

    const modal = $(`#${id}`);
    const modalOutput = $(`.modal-output[data-modal-target="${id}"]`);
    modal.addClass('is-animated');
    modal.removeClass('is-opened');
    modalOutput.removeClass('is-opened');
    modal.trigger('MODAL_BEFORE_CLOSE');

    let cancel = noop;
    function regCancel(fn) {
      cancel = fn;
    }
    requestTimeout(() => {
      modal.removeClass('is-animated');
      modal.trigger('MODAL_AFTER_CLOSE');
    }, 300, regCancel, noop);
  },
  calculatePosition(modalEl, source) {
    const modal = modalEl || $($('body').currentActiveModal);
    if (!modal) return;
    const isSm = window.Modernizr.mq(`(max-width: ${bp.sm - 1}px)`);

    if (isSm) {
      $(modal).css({ left: 0, top: 0 });
    } else {
      const modalOutput = source;
      if (!modalOutput) return;
      const wW = $(window).width();
      const wH = $(window).height();
      const modalSizes = modal.getBoundingClientRect();
      const outputSizes = modalOutput.getBoundingClientRect();
      const mWidth = modalSizes.width;
      const mHeight = modalSizes.height;
      const oBottom = outputSizes.bottom;
      const oTop = outputSizes.top;
      const oLeft = outputSizes.left;
      const oRight = outputSizes.right;
      const freeRight = wW - oLeft;
      const freeBottom = wH - oBottom;
      let y = 0;
      let x = 0;

      if (freeRight < (mWidth + 10)) {
        x = oRight - mWidth;
      } else {
        x = oLeft;
      }

      if (freeBottom < (mHeight + 20)) {
        y = oTop - mHeight;
      } else {
        y = oBottom;
      }

      $(modal).css({ left: `${x}px`, top: `${y}px` });
    }
  },
};

export function modalShowes() {
  $(document).on('click', '.js-toggle-modal', (evt) => {
    const _this = evt.currentTarget;
    const isReset = evt.target.closest('.js-reset-current-modal');
    if (isReset) return;

    const modalId = $(_this).attr('data-modal-target');
    const isActive = $(_this).hasClass('is-opened');
    const isShowUserPanel = $(_this).is('[data-modal-user-panel="visible"]');
    if (isActive) {
      modalMethods.close(modalId);
    } else {
      if (isShowUserPanel) {
        $('body').addClass('is-overlay-user-panel');
      }
      modalMethods.open(modalId, _this);
    }
  });

  $(document).on('click', (evt) => {
    const _this = evt.target;
    const isModalLink = $(_this).closest('.js-toggle-modal').length;
    const isModal = $(_this).closest('.modal').length;
    if (!isModal && !isModalLink) {
      modalMethods.closeAll();
    }
  });

  $(document).on('click', '.js-close-modal', (evt) => {
    const _this = evt.currentTarget;
    const modalId = $(_this).closest('.modal').attr('id');
    const isMapInFullView = $('body').hasClass('map-in-fullview');
    modalMethods.close(modalId);
    if (isMapInFullView) {
      $('body').removeClass('is-map-filter-shown');
    }
    $('body').removeClass(' is-overlay-user-panel');
  });

  const layouts = document.querySelectorAll('.layout__wrapper');
  const layout = document.querySelectorAll('.layout');

  layouts.forEach((el) => {
    el.addEventListener('scroll', modalMethods.closeScrollAll, { passive: true });
  });

  layout.forEach((el) => {
    el.addEventListener('scroll', modalMethods.closeScrollAll, { passive: true });
  });

  window.addEventListener('scroll', modalMethods.closeScrollAll, { passive: true });

  window.addEventListener('resize', modalMethods.closeScrollAll, { passive: true });
}
