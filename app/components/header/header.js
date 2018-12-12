import 'sticky-kit/dist/sticky-kit';

const $ = window.$;
export default function header() {
  $('.header').stick_in_parent().on('sticky_kit:stick', () => {
    $('.header').addClass('header-js');
  });
}

