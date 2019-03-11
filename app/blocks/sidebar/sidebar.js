import 'sticky-kit/dist/sticky-kit';

const $ = window.$;

export default function scrollCont() {
  function stickElement(el, offsetT) {
    $(el).stick_in_parent({
      offset_top: offsetT,
    });
  }

  function activationStick() {
    $('.js-sticky-block').each((i, el) => {
      const page = $('.page');
      const offsetTop = $(page).is('.page_subnav') ? 140 : 80;
      if ($(el).attr('data-unstick-media') !== undefined) {
        const mediaStopper = window.globalOptions.sizes[$(el).attr('data-unstick-media')];
        if ($(window).width() < mediaStopper) {
          $(el).trigger('sticky_kit:detach');
        } else {
          stickElement(el, offsetTop);
        }
      } else {
        stickElement(el, offsetTop);
      }
    });
  }

  activationStick();

  $(window).on('resize', activationStick);
}
