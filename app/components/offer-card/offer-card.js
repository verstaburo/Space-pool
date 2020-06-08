const $ = window.$;

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
    evt.preventDefault();
    const self = evt.currentTarget;
    if (window.Modernizr.mq('(min-width: 768px)')) {
      if ($(self).is('.is-active')) {
        offerCardMethods.close(self);
      } else {
        offerCardMethods.open(self);
      }
    }
  });

  $(document).on('click', '.js-sm-show-offer-details', (evt) => {
    evt.preventDefault();
    const link = evt.currentTarget;
    const self = $(link).closest('.js-show-offer-details');
    if (window.Modernizr.mq('(max-width: 767px)')) {
      if ($(self).is('.is-active')) {
        offerCardMethods.close(self);
      } else {
        offerCardMethods.open(self);
      }
    }
  });
}
