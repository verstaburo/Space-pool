const $ = window.$;
export default function banner() {
  $('.slider__search').on('click', () => {
    $.fancybox.open($('.banner .swiper-slide'));
  });
  $('.swiper-slide').on('click', (e) => {
    e.preventDefault();
  });
}