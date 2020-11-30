const {
  $,
} = window;

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
    const isPopup = ($(self).attr('data-rr-popup') === 'true');
    const isShowButton = ($(self).attr('data-rr-button-clone') === 'true');
    if (isShow === 'true') {
      evt.preventDefault();
      const wrapperName = $(self).attr('data-rr-wrapper-target');
      const rrId = self.hash;
      const parent = $(`[data-rr-wrapper-block="${wrapperName}"]`);
      const form = $(`${rrId}`);
      $(parent).append(form);
      $(parent).addClass('is-show');
      if (isPopup) {
        window.globalFunctions.freeze();
        $(parent).addClass('is-popup');
        $('body').addClass('is-rr-popup-show');
      }
      if (isShowButton) {
        const button = $(self)[0];
        $(self).addClass('is-cloned');
        let btnWrapper = $(button)[0];
        if ($(button).closest('.offer-short__buttons').length > 0) {
          // eslint-disable-next-line prefer-destructuring
          btnWrapper = $(button).closest('.offer-short__buttons')[0];
        }
        const btnWrapParam = btnWrapper.getBoundingClientRect();
        const btnWrapperClone = $(btnWrapper).clone();
        $(btnWrapperClone).addClass('is-rr-clone');
        $(btnWrapperClone).css({
          height: btnWrapParam.height,
          width: btnWrapParam.width,
          top: btnWrapParam.top,
          left: btnWrapParam.left,
        });
        $(parent).append(btnWrapperClone);
      }
    }
  });

  // закрываем форму
  $(document).on('click', '.js-reservation-request-close', (evt) => {
    evt.preventDefault();
    const self = evt.currentTarget;
    const wrapper = $(self).closest('[data-rr-wrapper-block]');
    const form = $(self).closest('form');
    const nextStep = $(form).attr('data-first-step');
    const isPopup = $(wrapper).is('.is-popup');
    $(wrapper).removeClass('is-show');
    window.stpFormGoToNextStep(form, nextStep, true);
    if (isPopup) {
      window.globalFunctions.unfreeze();
      $(wrapper).removeClass('is-popup');
      $('body').removeClass('is-rr-popup-show');
    }
    $('.is-cloned').removeClass('is-cloned');
    $('.is-rr-clone').remove();
  });
}
