const $ = window.$;

export default function reservationRequestShow() {
  // активируем при выборе опции
  $(document).on('change', '[data-rr-button]', (evt) => {
    const self = evt.currentTarget;
    const isChecked = self.checked;
    if (isChecked) {
      const rrValue = $(self).attr('data-rr-activator');
      const rrButtonName = $(self).attr('data-rr-button');
      $(`[data-rr-wrapper-target="${rrButtonName}"]`).attr('data-rr-need-to-show', rrValue);
    }
  });

  // показываем форму
  $(document).on('click', '[data-rr-need-to-show]', (evt) => {
    const self = evt.currentTarget;
    const isShow = $(self).attr('data-rr-need-to-show');
    if (isShow === 'true') {
      evt.preventDefault();
      const wrapperName = $(self).attr('data-rr-wrapper-target');
      const rrId = self.hash;
      const parent = $(`[data-rr-wrapper-block="${wrapperName}"]`);
      const form = $(`${rrId}`);
      $(parent).append(form);
      $(parent).addClass('is-show');
    }
  });

  // закрываем форму
  $(document).on('click', '.js-reservation-request-close', (evt) => {
    evt.preventDefault();
    const self = evt.currentTarget;
    const wrapper = $(self).closest('[data-rr-wrapper-block]');
    const form = $(self).closest('form');
    const nextStep = $(form).attr('data-first-step');
    $(wrapper).removeClass('is-show');
    window.stpFormGoToNextStep(form, nextStep, true);
  });
}
