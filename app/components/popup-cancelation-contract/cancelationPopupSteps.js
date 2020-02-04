const $ = window.$;

export default function cancelationPopupSteps() {
  function switchSection(input) {
    const self = input;
    const targetName = $(self).attr('data-switch-content');
    const targets = $(`[data-switch-target*=${targetName}]`);
    const targetOn = $(targets).filter((i, el) => $(el).attr('data-switch-on') !== undefined);
    const targetOff = $(targets).filter((i, el) => $(el).attr('data-switch-off') !== undefined);
    if (input.checked) {
      $(targetOn).removeClass('hide');
      $(targetOff).addClass('hide');
    } else {
      $(targetOn).addClass('hide');
      $(targetOff).removeClass('hide');
    }
  }

  function resetStepsPopupToStep0(popup) {
    const form = $(popup).find('[data-main-form]');
    form[0].reset();
    $('[data-step]').addClass('hide');
    $('[data-step*=step0]').removeClass('hide');
    $(popup).attr('data-current-step', 'step0');
    $(form).find('[data-switch-content]').each((i, el) => {
      switchSection(el);
    });
    $(form).removeClass('hide');
  }

  window.resetStepsPopupToStep0 = resetStepsPopupToStep0;

  $(document).on('click', '.js-stepform-mix', (evt) => {
    evt.preventDefault();
    const self = evt.currentTarget;
    const popup = $(self).closest('.popup');
    const activeStep = $(popup).attr('data-current-step');
    if (activeStep !== 'step0' && activeStep !== 'step5') {
      resetStepsPopupToStep0(popup);
    } else {
      $.fancybox.close();
      setTimeout(() => {
        resetStepsPopupToStep0(popup);
      }, 200);
    }
  });

  $(document).on('click', '.js-stepform-reset', (evt) => {
    evt.preventDefault();
    const self = evt.currentTarget;
    const popup = $(self).closest('.popup');
    resetStepsPopupToStep0(popup);
  });

  $(document).on('change', '[data-next-step]', (evt) => {
    const self = evt.currentTarget;
    const newStepName = $(self).attr('data-next-step');
    const allSteps = $('[data-step]');
    const newStep = $(`[data-step*=${newStepName}]`);
    const popup = $(self).closest('.popup');
    $(allSteps).addClass('hide');
    $(newStep).removeClass('hide');
    $(popup).attr('data-current-step', newStepName);
  });

  $(document).on('change', '[data-switch-content]', (evt) => {
    const self = evt.currentTarget;
    switchSection(self);
  });

  $(document).on('click', '.js-goto-last-step', (evt) => {
    evt.preventDefault();
    const self = evt.currentTarget;
    const fn = $(self).attr('data-callback');
    const form = $.find(`#${$(self).attr('form')}`);
    $(self).addClass('is-loading');
    window[fn](form).then((readySaved) => {
      const popup = $(self).closest('.popup');
      const activeStep = $(popup).attr('data-current-step');
      if (readySaved && activeStep === 'step4') {
        $(self).removeClass('is-loading');
        const allSteps = $('[data-step]');
        const newStep = $('[data-step*=step5]');
        $(allSteps).addClass('hide');
        $(newStep).removeClass('hide');
        $(form).addClass('hide');
        $(popup).attr('data-current-step', 'step5');
      } else {
        $(self).removeClass('is-loading');
      }
    });
  });
}
