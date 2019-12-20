/* eslint-disable no-unused-vars */
// http://idangero.us/swiper/#.WcIu5oy0OHs
import * as Swiper from 'swiper/js/swiper';

const $ = window.$;

export default function slider() {
  const newsSliders = $('.js-slider-news');
  const spacesSliders = $('.js-slider-spaces');
  const roomsSliders = $('.js-slider-rooms');
  const spacesInnerSliders = $('.js-slider-spaces-inner');
  const gallerySlider = $('.js-slider-gallery');
  const monthsSlider = $('.js-slider-calendar');
  const promoSlider = $('.js-slider-promo');
  const mapSlider = $('.js-slider-map');
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
        loopAdditionalSlides: 4,
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
        on: {
          init() {
            $(sliderContainer).addClass('is-visible');
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
        loopAdditionalSlides: 4,
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
        on: {
          init() {
            $(sliderContainer).addClass('is-visible');
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
        loopAdditionalSlides: 3,
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
        on: {
          init() {
            $(sliderContainer).addClass('is-visible');
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
        on: {
          init() {
            $(sliderContainer).addClass('is-visible');
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
        autoplay: false,
        loop: true,
        speed: 500,
        slidesPerView: 'auto',
        initialSlide: 0,
        // runCallbacksOnInit: false,
        centeredSlides: true,
        slidesPerGroup: 1,
        roundLengths: false,
        observer: true,
        observeParents: true,
        loopedSlides: 3,
        preloadImages: true,
        updateOnImagesReady: true,
        normalizeSlideIndex: false,
        navigation: {
          nextEl: btnNext,
          prevEl: btnPrev,
        },
        on: {
          init() {
            $(sliderContainer).addClass('is-visible');
          },
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
        // loop: true,
        speed: 500,
        slidesPerView: 4,
        slidesPerGroup: 1,
        roundLengths: false,
        observer: true,
        observeParents: true,
        initialSlide: currMonth,
        slideToClickedSlide: true,
        // runCallbacksOnInit: true,
        navigation: {
          nextEl: btnNext,
          prevEl: btnPrev,
        },
        on: {
          init() {
            $(sliderContainer).addClass('is-visible');
          },
          transitionStart() {
            const it = this.el;
            const slides = this.slides;
            const activeIndex = this.activeIndex;
            const activeSlide = slides[activeIndex];
            const item = $(it).find(`[data-calendar-month=${activeIndex}]`);
            window.chooseMonth(item);
            // $(activeSlide).find('[data-calendar-month]').trigger('click');
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
        on: {
          init() {
            $(sliderContainer).addClass('is-visible');
          },
        },
      });
    });
  }

  if (mapSlider.length > 0) {
    $(mapSlider).each((i, el) => {
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
        observer: true,
        observeParents: true,
        navigation: {
          nextEl: btnNext,
          prevEl: btnPrev,
        },
        fadeEffect: {
          crossFade: true,
        },
        on: {
          init() {
            $(sliderContainer).addClass('is-visible');
          },
          slideChange() {
            const sw = this;
            const activeIndex = sw.realIndex;
            const slides = sw.slides;
            const activeSlide = slides[activeIndex];
            if (!window.manualChange) {
              const markerId = $(activeSlide).attr('data-map-marker');
              const marker = $(`[data-map-marker-id="${markerId}"]`);
              $(marker).trigger('changeBySlide');
            }
            window.manualChange = false;
          },
        },
      });
    });
  }
}
/* eslint-enable no-unused-vars */
