import 'sticky-kit/dist/sticky-kit';

const $ = window.$;

export default function scrollCont() {
  function stickElement(el) {
    $(el).stick_in_parent({
      offset_top: 80,
    });
  }

  function activationStick() {
    $('.js-sticky-block').each((i, el) => {
      if ($(el).attr('data-unstick-media') !== undefined) {
        const mediaStopper = window.globalOptions.sizes[$(el).attr('data-unstick-media')];
        console.log(`${mediaStopper}px`);
        if ($(window).width() < mediaStopper) {
          $(el).trigger('sticky_kit:detach');
        } else {
          stickElement(el);
        }
      } else {
        stickElement(el);
      }
    });
  }

  activationStick();

  $(window).on('resize', activationStick);
}
