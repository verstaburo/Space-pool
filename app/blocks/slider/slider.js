/* eslint-disable no-unused-vars */
// http://idangero.us/swiper/#.WcIu5oy0OHs
import * as Swiper from 'swiper/dist/js/swiper';

const $ = window.$;

export default function slider() {
  const newsSliders = $('.js-slider-news');
  const spacesSliders = $('.js-slider-spaces');
  const roomsSliders = $('.js-slider-rooms');
  const spacesInnerSliders = $('.js-slider-spaces-inner');
  const gallerySlider = $('.js-slider-gallery');
  const monthsSlider = $('.js-slider-calendar');
  const promoSlider = $('.js-slider-promo');
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
          1299: {
            slidesPerView: 3,
          },
          1019: {
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

  if (spacesInnerSliders.length > 0) {
    $(spacesInnerSliders).each((i, el) => {
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
          1299: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
          1019: {
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
          1299: {
            slidesPerView: 2,
            spaceBetween: 42,
          },
          1019: {
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
          1299: {
            slidesPerView: 2,
            spaceBetween: 42,
          },
          1019: {
            slidesPerView: 1,
            spaceBetween: 30,
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

  if (gallerySlider.length > 0) {
    $(gallerySlider).each((i, el) => {
      const btnPrev = $(el).find('.js-slider-button-prev')[0];
      const btnNext = $(el).find('.js-slider-button-next')[0];
      const sliderContainer = $(el).find('.js-slider-container');
      const newslider = new Swiper(sliderContainer, {
        loop: true,
        speed: 500,
        slidesPerView: 'auto',
        centeredSlides: true,
        slidesPerGroup: 1,
        roundLengths: false,
        observer: true,
        observeParents: true,
        navigation: {
          nextEl: btnNext,
          prevEl: btnPrev,
        },
      });

      $(document).on('isCloseMap', '.map', () => {
        newslider.update();
      });
      $(document).on('isOpenMap', '.map', () => {
        newslider.update();
      });
    });
  }

  if (monthsSlider.length > 0) {
    $(monthsSlider).each((i, el) => {
      const btnPrev = $(el).find('.js-slider-button-prev')[0];
      const btnNext = $(el).find('.js-slider-button-next')[0];
      const sliderContainer = $(el).find('.js-slider-container');
      const currDate = new Date();
      const currMonth = currDate.getMonth();
      const newslider = new Swiper(sliderContainer, {
        speed: 500,
        slidesPerView: 4,
        slidesPerGroup: 1,
        roundLengths: false,
        observer: true,
        observeParents: true,
        initialSlide: currMonth,
        slideToClickedSlide: true,
        navigation: {
          nextEl: btnNext,
          prevEl: btnPrev,
        },
        on: {
          slideChange(inst) {
            const slides = this.slides;
            const activeIndex = this.activeIndex;
            const activeSlide = slides[activeIndex];
            $(activeSlide).find('[data-calendar-month]').trigger('click');
          },
        },
      });
    });
  }

  if (promoSlider.length > 0) {
    $(promoSlider).each((i, el) => {
      const btnPrev = $(el).find('.js-slider-button-prev')[0];
      const btnNext = $(el).find('.js-slider-button-next')[0];
      const dots = $(el).find('[data-slider-dots]')[0];
      const sliderContainer = $(el).find('.js-slider-container');
      const newslider = new Swiper(sliderContainer, {
        speed: 500,
        loop: true,
        slidesPerView: 1,
        slidesPerGroup: 1,
        roundLengths: false,
        autoHeight: true,
        effect: 'fade',
        navigation: {
          nextEl: btnNext,
          prevEl: btnPrev,
        },
        pagination: {
          el: dots,
          bulletElement: 'li',
          clickable: false,
          bulletClass: 'slider__dot',
        },
        fadeEffect: {
          crossFade: true,
        },
      });
    });
  }
}
/* eslint-enable no-unused-vars */
