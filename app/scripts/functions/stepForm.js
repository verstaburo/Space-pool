const $ = window.$;

export default function stpFormSwitch() {
  function goToNextStep(frm, nextStep, reset) {
    const form = $(frm);
    const nxtStep = nextStep;
    if (reset && $(form).is('form')) {
      form[0].reset();
    }
    $('[data-step]').addClass('hide');
    $(`[data-step*=${nxtStep}]`).removeClass('hide');
    $(form).attr('data-current-step', nxtStep);
  }

  window.stpFormGoToNextStep = goToNextStep;

  $(document).on('click', '.js-stp-form-next', (evt) => {
    evt.preventDefault();
    const self = evt.currentTarget;
    const form = $(self).closest('form').length !== 0 ? $(self).closest('form') : $(self).closest('[data-steps-container]');
    const nextStep = $(self).attr('data-next-step');
    goToNextStep(form, nextStep);
  });

  $(document).on('click', '.js-stp-form-reset', (evt) => {
    const self = evt.currentTarget;
    const form = $(self).closest('form').length !== 0 ? $(self).closest('form') : $(self).closest('[data-steps-container]');
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
    const form = $(self).closest('form').length !== 0 ? $(self).closest('form') : $(self).closest('[data-steps-container]');
    const nextStep = $(self).attr('data-final-step');
    $(self).addClass('is-loading');
    window[fn](form).then((readySaved) => {
      if (readySaved) {
        $(self).removeClass('is-loading');
        goToNextStep(form, nextStep);
      } else {
        $(self).removeClass('is-loading');
      }
    });
  });
}
