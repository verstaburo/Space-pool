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
      nextEl: '.slider__button-one_next',
      prevEl: '.slider__button-one_prev',
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
    spaceBetween: 50,
    slidesPerView: 4,
    navigation: {
      nextEl: '.js-two-slider_next',
      prevEl: '.js-two-slider_prev',
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
      nextEl: '.js-three-slider_next',
      prevEl: '.js-three-slider_prev',
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

  const mySliderFor = new Swiper('.js-slider-for', {
    loop: true,
    speed: 700,
    spaceBetween: 55,
    slidesPerView: 3,
    navigation: {
      nextEl: '.js-for-slider_next',
      prevEl: '.js-for-slider_prev',
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

  const mySliderFive = new Swiper('.js-slider-five', {
    loop: true,
    speed: 700,
    spaceBetween: 50,
    slidesPerView: 4,
    navigation: {
      nextEl: '.js-five-slider_next',
      prevEl: '.js-five-slider_prev',
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
