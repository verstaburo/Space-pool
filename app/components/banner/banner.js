const $ = window.$;
export default function banner() {
  $('.slider__search').on('click', () => {
    $.fancybox.open($('.slide-img'));
  });
}
