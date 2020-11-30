const { $ } = window;

export default function offerCard() {
  const offerCardMethods = {
    open(el) {
      $(el).addClass('is-active');
      setTimeout(() => {
        $('body').trigger('sticky_kit:recalc');
      }, 50);
    },
    close(el) {
      $(el).removeClass('is-active');
      $('body').trigger('sticky_kit:recalc');
    },
  };

  $(document).on('click', '.js-show-offer-details', (evt) => {
    const _src = evt.target;
    const self = evt.currentTarget;
    const isBlind = $(_src).is('[data-blind-zone]') || $(_src).closest('[data-blind-zone]').length > 0;
    if (!isBlind) {
      evt.preventDefault();
      if ($(self).is('.is-active')) {
        offerCardMethods.close(self);
      } else {
        offerCardMethods.open(self);
      }
    }
  });

  // $(document).on('click', '.js-sm-show-offer-details', (evt) => {
  //   const link = evt.currentTarget;
  //   const self = $(link).closest('.js-show-offer-details');
  //   const _src = evt.target;
  //   const isBlind = $(_src).is('[data-blind-zone]')
  //     ||
  //     $(_src).closest('[data-blind-zone]').length > 0;
  //   if (window.Modernizr.mq('(max-width: 767px)') && !isBlind) {
  //     evt.preventDefault();
  //     if ($(self).is('.is-active')) {
  //       offerCardMethods.close(self);
  //     } else {
  //       offerCardMethods.open(self);
  //     }
  //   }
  // });

  $(document).on('click', '.js-show-short-offer-details', (evt) => {
    const self = evt.currentTarget;
    const _src = evt.target;
    const isBlind = $(_src).is('[data-blind-zone]') || $(_src).closest('[data-blind-zone]').length > 0;
    if ($(self).is('.is-active') && !isBlind) {
      evt.preventDefault();
      offerCardMethods.close(self);
    } else {
      $('.js-show-short-offer-details').removeClass('is-active');
      offerCardMethods.open(self);
    }
  });
}
