/* eslint-disable no-unused-vars */
// http://idangero.us/swiper/#.WcIu5oy0OHs
import * as Swiper from 'swiper/dist/js/swiper';

const $ = window.$;

export default function slider() {
  const newsSliders = $('.js-slider-news');
  const spacesSliders = $('.js-slider-spaces');
  const roomsSliders = $('.js-slider-rooms');
  const bp = window.globalOptions.sizes;

  if (spacesSliders.length > 0) {
    $(spacesSliders).each((i, el) => {
      const btnPrev = $(el).find('.js-slider-button-prev')[0];
      const btnNext = $(el).find('.js-slider-button-next')[0];
      const sliderContainer = $(el).find('.js-slider-container');
      const newslider = new Swiper(sliderContainer, {
        loop: true,
        speed: 500,
        spaceBetween: 50,
        slidesPerView: 4,
        slidesPerGroup: 1,
        roundLengths: true,
        navigation: {
          nextEl: btnNext,
          prevEl: btnPrev,
        },
        breakpoints: {
          1699: {
            slidesPerView: 3,
          },
          1279: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          767: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
        },
      });

      function setBtnContainerHeight() {
        const btnContainer = $(el).find('[data-slider-buttons]');
        $(btnContainer).css({
          height: '',
        });
        const elementsImage = $(el).find('[data-slider-buttons-orientir]');
        const orientirHeight = $(elementsImage).first().outerHeight();
        $(btnContainer).css({
          height: `${orientirHeight}px`,
        });
      }
      setBtnContainerHeight();
      $(window).on('resize', setBtnContainerHeight);
    });
  }

  if (roomsSliders.length > 0) {
    $(roomsSliders).each((i, el) => {
      const btnPrev = $(el).find('.js-slider-button-prev')[0];
      const btnNext = $(el).find('.js-slider-button-next')[0];
      const sliderContainer = $(el).find('.js-slider-container');
      const newslider = new Swiper(sliderContainer, {
        loop: true,
        speed: 500,
        spaceBetween: 50,
        slidesPerView: 3,
        slidesPerGroup: 1,
        roundLengths: true,
        navigation: {
          nextEl: btnNext,
          prevEl: btnPrev,
        },
        breakpoints: {
          1699: {
            slidesPerView: 2,
            spaceBetween: 42,
          },
          1279: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          767: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
        },
      });

      function setBtnContainerHeight() {
        const btnContainer = $(el).find('[data-slider-buttons]');
        $(btnContainer).css({
          height: '',
        });
        const elementsImage = $(el).find('[data-slider-buttons-orientir]');
        const orientirHeight = $(elementsImage).first().outerHeight();
        $(btnContainer).css({
          height: `${orientirHeight}px`,
        });
      }
      setBtnContainerHeight();
      $(window).on('resize', setBtnContainerHeight);
    });
  }

  if (newsSliders.length > 0) {
    $(newsSliders).each((i, el) => {
      const btnPrev = $(el).find('.js-slider-button-prev')[0];
      const btnNext = $(el).find('.js-slider-button-next')[0];
      const sliderContainer = $(el).find('.js-slider-container');
      const newslider = new Swiper(sliderContainer, {
        loop: false,
        speed: 500,
        spaceBetween: 50,
        slidesPerView: 3,
        slidesPerGroup: 1,
        roundLengths: true,
        watchOverflow: true,
        navigation: {
          nextEl: btnNext,
          prevEl: btnPrev,
        },
        breakpoints: {
          1699: {
            slidesPerView: 2,
            spaceBetween: 42,
          },
          1279: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
        },
      });

      function setBtnContainerHeight() {
        const btnContainer = $(el).find('[data-slider-buttons]');
        $(btnContainer).css({
          height: '',
        });
        const elementsImage = $(el).find('[data-slider-buttons-orientir]');
        const orientirHeight = $(elementsImage).first().outerHeight();
        $(btnContainer).css({
          height: `${orientirHeight}px`,
        });
      }
      setBtnContainerHeight();
      $(window).on('resize', setBtnContainerHeight);
    });
  }
}
/* eslint-enable no-unused-vars */
