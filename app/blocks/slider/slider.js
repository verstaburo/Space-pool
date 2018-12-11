/* eslint-disable no-unused-vars */
// http://idangero.us/swiper/#.WcIu5oy0OHs
import * as Swiper from 'swiper/dist/js/swiper';

const $ = window.$;

export default function slider() {
  const mySlider = new Swiper('.js-slider', {
    loop: false,
    speed: 700,
    slidesPerView: 3,
    navigation: {
      nextEl: '.slider__button_next',
      prevEl: '.slider__button_prev',
    },
    pagination: {
      el: '.slider__dots',
      clickable: true,
      paginationClickableClass: 'slider__dots_clickable',
      bulletClass: 'slider__dot',
      bulletActiveClass: 'active',
    },
    roundLengths: true,
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
    },
  });

  const mySliderTwo = new Swiper('.js-slider-two', {
    loop: true,
    speed: 700,
    spaceBetween: 55,
    slidesPerView: 4,
    navigation: {
      nextEl: '.slider__button_next',
      prevEl: '.slider__button_prev',
    },
    pagination: {
      el: '.slider__dots',
      clickable: true,
      paginationClickableClass: 'slider__dots_clickable',
      bulletClass: 'slider__dot',
      bulletActiveClass: 'active',
    },
    roundLengths: true,
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
    },
  });

  const mySliderThree = new Swiper('.js-slider-three', {
    loop: true,
    speed: 700,
    spaceBetween: 55,
    slidesPerView: 3,
    navigation: {
      nextEl: '.slider__button_next',
      prevEl: '.slider__button_prev',
    },
    pagination: {
      el: '.slider__dots',
      clickable: true,
      paginationClickableClass: 'slider__dots_clickable',
      bulletClass: 'slider__dot',
      bulletActiveClass: 'active',
    },
    roundLengths: true,
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
    },
  });
}
/* eslint-enable no-unused-vars */
