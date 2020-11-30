const { $ } = window;

export default function switchOfferState() {
  // we track the change of the 'available' state
  $(document).on('click', '.js-switch-offer-state', (evt) => {
    const self = $(evt.target).is('.js-switch-offer-state') ? $(evt.target) : $(evt.target).closest('.js-switch-offer-state');
    const offer = $(self).closest('.offer');
    const checkbox = $(self).find('input[type="checkbox"]');
    setTimeout(() => {
      const status = $(checkbox).prop('checked');
      if (status) {
        $(offer).removeClass('is-disabled');
      } else {
        $(offer).addClass('is-disabled');
      }
    }, 50);
  });
}
