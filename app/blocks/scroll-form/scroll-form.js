import 'sticky-kit/dist/sticky-kit';

const $ = window.$;

export default function scrollCont() {
  $('.scroll-form').stick_in_parent({ offset_top: 120 });
  $('.header').stick_in_parent().on('sticky_kit:stick', () => {
    $('.header').addClass('header-js');
  });
}
