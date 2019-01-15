import isTouchDevice from 'is-touch-device';

const $ = window.$;

export default function offerItemOpen() {
  function closeOffers(timer) {
    const ms = timer || 0;
    if ($('.js-show-offer').length > 0) {
      $('.js-show-offer').each((i, el) => {
        const parent = $(el).closest('[data-offer-item]');
        const content = $(parent).find('[data-offer-item-content]');
        $(parent).removeClass('is-open');
        $(content).slideUp(ms);
      });
    }
  }

  function openOffer(btn) {
    const parent = $(btn).closest('[data-offer-item]');
    const content = $(parent).find('[data-offer-item-content]');
    if ($(parent).is('.is-open')) {
      closeOffers(300);
    } else {
      closeOffers(300);
      $(parent).addClass('is-open');
      $(content).slideDown(300);
    }
  }

  window.closeOfferItems = closeOffers;

  $(document).on('click', '.js-show-offer', (evt) => {
    evt.preventDefault();
    const self = $(evt.target).is('.js-show-offer') ? $(evt.target) : $(evt.target).closest('.js-show-offer');
    if (!isTouchDevice()) {
      openOffer(self);
    }
  });

  $(document).on('touchstart', '.js-show-offer', (evt) => {
    const self = $(evt.target).is('.js-show-offer') ? $(evt.target) : $(evt.target).closest('.js-show-offer');
    if (isTouchDevice()) {
      openOffer(self);
    }
  });
}
