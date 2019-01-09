import 'sticky-kit/dist/sticky-kit';

const $ = window.$;

export default function scrollCont() {
  $('.js-sticky-block').stick_in_parent({
    offset_top: 80,
  });
}
