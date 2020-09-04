import $ from 'jquery';
import 'parsleyjs';

export default function stpFormSwitch() {
  function goToNextStep(frm, nextStep, reset) {
    const form = $(frm);
    const nxtStep = nextStep;
    if ($(form).is('form') && reset) {
      form[0].reset();
      window.setLabelPosition();
    }
    $('[data-step]').addClass('hide');
    $(`[data-step*=${nxtStep}]`).removeClass('hide');
    $(form).attr('data-current-step', nxtStep);
    if ($(form).is('[data-search-panel]')) {
      if (nxtStep !== 'default') {
        $(form).addClass('is-float-up');
        window.globalFunctions.freeze();
      } else {
        $(form).removeClass('is-float-up');
        window.globalFunctions.unfreeze();
      }
    }
  }

  window.stpFormGoToNextStep = goToNextStep;

  $(document).on('click', '.js-stp-form-next', (evt) => {
    evt.preventDefault();
    const self = evt.currentTarget;
    const form = $(self).closest('[data-steps-container]').length !== 0 ? $(self).closest('[data-steps-container]') : $(self).closest('form');
    const nextStep = $(self).attr('data-next-step');
    goToNextStep(form, nextStep);
  });

  $(document).on('click', '.js-stp-form-reset', (evt) => {
    const self = evt.currentTarget;
    const form = $(self).closest('[data-steps-container]').length !== 0 ? $(self).closest('[data-steps-container]') : $(self).closest('form');
    const nextStep = $(form).attr('data-first-step');
    goToNextStep(form, nextStep, true);
    if ($(self).attr('data-pp-close') !== undefined) {
      $.fancybox.close();
    }
  });

  $(document).on('click', '.js-stp-form-final', (evt) => {
    evt.preventDefault();
    const self = evt.currentTarget;
    const fn = $(self).attr('data-callback');
    const form = $(self).closest('[data-steps-container]').length !== 0 ? $(self).closest('[data-steps-container]') : $(self).closest('form');
    const nextStep = $(self).attr('data-final-step');
    if ($(form).is('[data-validated-form]')) {
      $(form).parsley().whenValidate().done(() => {
        if ($(form).parsley().isValid()) {
          $(self).addClass('is-loading');
          window[fn](form).then((readySaved) => {
            if (readySaved) {
              $(self).removeClass('is-loading');
              goToNextStep(form, nextStep);
            } else {
              $(self).removeClass('is-loading');
            }
          });
        }
      });
    } else {
      $(self).addClass('is-loading');
      window[fn](form).then((readySaved) => {
        if (readySaved) {
          $(self).removeClass('is-loading');
          goToNextStep(form, nextStep);
        } else {
          $(self).removeClass('is-loading');
        }
      });
    }
  });
}
