/* eslint-disable no-unused-vars */
// http://idangero.us/swiper/#.WcIu5oy0OHs
import detectIt from 'detect-it';
import * as Swiper from 'swiper/js/swiper';

const {
  $,
} = window;

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
  const ndSlider = $('.js-nd-slider');
  const ndBlogSlider = $('.js-nd-blog-slider');
  const ndPromoSlider = $('[data-promo-slider]');
  const ndGallery = $('.js-nd-gallery');
  const ndDoubleSlider = $('.js-nd-double-space-slider');
  const ndOfferSlider = $('.js-offer-slider');
  const ndFilterTagSlider = $('.js-filter-tag-slider');
  const ndNavigationSlider = $('.js-nav-slider');

  function setBtnContainerHeight(el) {
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

  if (spacesSliders.length > 0) {
    $(spacesSliders).each((i, el) => {
      const btnPrev = $(el).find('.js-slider-button-prev')[0];
      const btnNext = $(el).find('.js-slider-button-next')[0];
      const sliderContainer = $(el).find('.js-slider-container');
      const newslider = new Swiper(sliderContainer, {
        loop: true,
        speed: 500,
        spaceBetween: 10,
        slidesPerView: 2,
        slidesPerGroup: 1,
        loopAdditionalSlides: 4,
        roundLengths: true,
        navigation: {
          nextEl: btnNext,
          prevEl: btnPrev,
        },
        breakpoints: {
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1020: {
            slidesPerView: 3,
          },
          1300: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        },
        on: {
          init() {
            $(sliderContainer).addClass('is-visible');
            setBtnContainerHeight(el);
          },
          resize() {
            setBtnContainerHeight(el);
          },
        },
      });
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
        spaceBetween: 10,
        slidesPerView: 1,
        slidesPerGroup: 1,
        roundLengths: true,
        loopAdditionalSlides: 4,
        navigation: {
          nextEl: btnNext,
          prevEl: btnPrev,
        },
        breakpoints: {
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1020: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
          1300: {
            spaceBetween: 50,
            slidesPerView: 4,
          },
        },
        on: {
          init() {
            $(sliderContainer).addClass('is-visible');
            setBtnContainerHeight(el);
          },
          resize() {
            setBtnContainerHeight(el);
          },
        },
      });
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
        spaceBetween: 10,
        slidesPerView: 1,
        slidesPerGroup: 1,
        roundLengths: true,
        loopAdditionalSlides: 3,
        navigation: {
          nextEl: btnNext,
          prevEl: btnPrev,
        },
        breakpoints: {
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1020: {
            slidesPerView: 2,
            spaceBetween: 42,
          },
          1300: {
            spaceBetween: 50,
            slidesPerView: 3,
          },
        },
        on: {
          init() {
            $(sliderContainer).addClass('is-visible');
            setBtnContainerHeight(el);
          },
          resize() {
            setBtnContainerHeight(el);
          },
        },
      });
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
        spaceBetween: 30,
        slidesPerView: 1,
        slidesPerGroup: 1,
        roundLengths: true,
        watchOverflow: true,
        navigation: {
          nextEl: btnNext,
          prevEl: btnPrev,
        },
        breakpoints: {
          1020: {
            slidesPerView: 2,
            spaceBetween: 42,
          },
          1300: {
            spaceBetween: 50,
            slidesPerView: 3,
          },
        },
        on: {
          init() {
            $(sliderContainer).addClass('is-visible');
            setBtnContainerHeight(el);
          },
          resize() {
            setBtnContainerHeight(el);
          },
        },
      });
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
            const {
              slides,
            } = this;
            const {
              activeIndex,
            } = this;
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
            const {
              slides,
            } = sw;
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

  if (ndSlider.length > 0) {
    $(ndSlider).each((i, el) => {
      const btnPrev = $(el).find('.js-slider-button-prev')[0];
      const btnNext = $(el).find('.js-slider-button-next')[0];
      const sliderContainer = $(el).find('.js-slider-container')[0];
      let isCSSMode = false;
      if (detectIt.hasTouch && !window.Modernizr.scrollsnappoints) {
        isCSSMode = true;
        $(el).addClass('is-css-mode-slider');
      } else {
        isCSSMode = false;
        $(el).removeClass('is-css-mode-slider');
      }
      const newslider = new Swiper(sliderContainer, {
        speed: 500,
        spaceBetween: 0,
        slidesPerView: 'auto',
        slidesPerGroup: 1,
        roundLengths: true,
        cssMode: isCSSMode,
        navigation: {
          nextEl: btnNext,
          prevEl: btnPrev,
        },
        breakpoints: {
          320: {
            slidesPerView: 'auto',
            spaceBetween: 0,
          },
          1030: {
            slidesPerView: 5,
            slidesPerGroup: 1,
            // freeMode: false,
            spaceBetween: 21,
          },
          1400: {
            slidesPerView: 5,
            slidesPerGroup: 1,
            // freeMode: false,
            spaceBetween: 25,
          },
          1850: {
            slidesPerView: 5,
            slidesPerGroup: 1,
            // freeMode: false,
            spaceBetween: 27,
          },
        },
        on: {
          init() {
            $(sliderContainer).addClass('is-visible');
            setBtnContainerHeight(el);
          },
          resize() {
            setBtnContainerHeight(el);
            if (window.Modernizr.mq('(max-width: 1029px)')) {
              $(this.slides).each((ix, slide) => {
                $(slide).removeAttr('style');
              });
            }
          },
        },
      });
    });
  }

  if (ndBlogSlider.length > 0) {
    $(ndBlogSlider).each((i, el) => {
      const btnPrev = $(el).find('.js-slider-button-prev')[0];
      const btnNext = $(el).find('.js-slider-button-next')[0];
      const sliderContainer = $(el).find('.js-slider-container')[0];
      let isCSSMode = false;
      if (detectIt.hasTouch && !window.Modernizr.scrollsnappoints) {
        isCSSMode = true;
        $(el).addClass('is-css-mode-slider');
      } else {
        isCSSMode = false;
        $(el).removeClass('is-css-mode-slider');
      }
      const newslider = new Swiper(sliderContainer, {
        speed: 500,
        spaceBetween: 0,
        slidesPerView: 'auto',
        slidesPerGroup: 1,
        roundLengths: true,
        cssMode: isCSSMode,
        breakpoints: {
          320: {
            slidesPerView: 'auto',
            spaceBetween: 0,
          },
          1030: {
            slidesPerView: 3,
            spaceBetween: 42,
          },
          1400: {
            slidesPerView: 3,
            spaceBetween: 47,
          },
          1850: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        },
        on: {
          init() {
            $(sliderContainer).addClass('is-visible');
          },
          resize() {
            if (window.Modernizr.mq('(max-width: 1029px)')) {
              $(this.slides).each((ix, slide) => {
                $(slide).removeAttr('style');
              });
            }
          },
        },
      });
    });
  }

  if (ndPromoSlider.length > 0) {
    $(ndPromoSlider).each((i, el) => {
      const btnPrev = $(el).find('[data-promo-slider-button-prev]')[0];
      const btnNext = $(el).find('[data-promo-slider-button-next]')[0];
      const sliderContainer = $(el).find('[data-promo-slider-container]');
      const pagination = $(el).find('[data-promo-slider-pagination]')[0];
      const newslider = new Swiper(sliderContainer, {
        speed: 500,
        slidesPerView: 1,
        roundLengths: true,
        effect: 'fade',
        navigation: {
          nextEl: btnNext,
          prevEl: btnPrev,
        },
        pagination: {
          el: pagination,
        },
        fadeEffect: {
          crossFade: true,
        },
        on: {
          init() {
            const {
              slides,
            } = this;
            const currentSlideIndex = this.activeIndex;
            const currentSlide = slides[currentSlideIndex];
            const newTitle = $(currentSlide).attr('data-promo-slide-title');
            const targetBlock = $(el).find('[data-promo-slider-titles]');
            $(targetBlock).text(newTitle);
            $(sliderContainer).addClass('is-visible');
          },
          slideChange() {
            const {
              slides,
            } = this;
            const currentSlideIndex = this.activeIndex;
            const currentSlide = slides[currentSlideIndex];
            const newTitle = $(currentSlide).attr('data-promo-slide-title');
            const targetBlock = $(el).find('[data-promo-slider-titles]');
            $(targetBlock).text(newTitle);
          },
        },
      });
    });
  }

  function gallerySliderInit(el) {
    const btnPrev = $(el).find('.js-gallery-button-prev')[0];
    const btnNext = $(el).find('.js-gallery-button-next')[0];
    const sliderContainer = $(el).find('.js-gallery-container');
    const pagination = $(el).find('.js-gallery-pagination')[0];
    const galleryController = $(el).siblings('.js-gallery-controller')[0];
    let controller = false;
    let control = {};
    let isCSSMode = false;
    if (detectIt.hasTouch && !window.Modernizr.scrollsnappoints) {
      isCSSMode = true;
      $(el).addClass('is-css-mode-slider');
    } else {
      isCSSMode = false;
      $(el).removeClass('is-css-mode-slider');
    }
    if (galleryController) {
      controller = new Swiper(galleryController, {
        loop: false,
        speed: 500,
        slidesPerView: 5,
        initialSlide: 0,
        slidesPerGroup: 1,
        roundLengths: false,
        resize: true,
        preloadImages: true,
        updateOnImagesReady: true,
        observeParents: true,
        observer: true,
        watchOverflow: true,
        spaceBetween: 20,
        cssMode: isCSSMode,
        on: {
          init() {
            $(sliderContainer).addClass('is-visible');
          },
        },
      });

      control = {
        swiper: controller,
      };
    }

    const newslider = new Swiper(sliderContainer, {
      loop: true,
      speed: 500,
      slidesPerView: 1,
      initialSlide: 0,
      slidesPerGroup: 1,
      roundLengths: false,
      resize: true,
      preloadImages: true,
      updateOnImagesReady: true,
      observeParents: true,
      observer: true,
      watchOverflow: true,
      thumbs: control,
      cssMode: isCSSMode,
      resistanceRatio: 0,
      navigation: {
        nextEl: btnNext,
        prevEl: btnPrev,
      },
      pagination: {
        el: pagination,
      },
      on: {
        init() {
          $(sliderContainer).addClass('is-visible');
        },
      },
      containerModifierClass: 'gallery__slider_',
      wrapperClass: 'gallery__wrapper',
      slideClass: 'gallery__slide',
      slideActiveClass: 'gallery__slide_active',
      slideDuplicateActiveClass: 'gallery__slide_duplicate_active',
      slideVisibleClass: 'gallery__slide_visible',
      slideDuplicateClass: 'gallery__slide_duplicate',
      slideNextClass: 'gallery__slide_next',
      slideDuplicateNextClass: 'gallery__slide_duplicate_next',
      slidePrevClass: 'gallery__slide_prev',
      slideDuplicatePrevClass: 'gallery__slide_duplicate_prev',
    });
  }

  function offerSliderInit(el) {
    const btnPrev = $(el).find('.js-offer-slider-button-prev')[0];
    const btnNext = $(el).find('.js-offer-slider-button-next')[0];
    const sliderContainer = $(el).find('.js-offer-slider-container')[0];
    const pagination = $(el).find('.js-offer-slider-pagination')[0];
    let isCSSMode = false;
    if (detectIt.hasTouch && !window.Modernizr.scrollsnappoints) {
      isCSSMode = true;
      $(el).addClass('is-css-mode-slider');
    } else {
      isCSSMode = false;
      $(el).removeClass('is-css-mode-slider');
    }
    const newslider = new Swiper(sliderContainer, {
      speed: 500,
      slidesPerView: 1,
      initialSlide: 0,
      slidesPerGroup: 1,
      roundLengths: false,
      resize: true,
      preloadImages: true,
      updateOnImagesReady: true,
      observeParents: true,
      observer: true,
      watchOverflow: true,
      cssMode: isCSSMode,
      navigation: {
        nextEl: btnNext,
        prevEl: btnPrev,
      },
      pagination: {
        el: pagination,
      },
      on: {
        init() {
          $(sliderContainer).addClass('is-visible');
        },
      },
      containerModifierClass: 'offer-slider__slider_',
      wrapperClass: 'offer-slider__wrapper',
      slideClass: 'offer-slider__slide',
      slideActiveClass: 'offer-slider__slide_active',
      slideDuplicateActiveClass: 'offer-slider__slide_duplicate_active',
      slideVisibleClass: 'offer-slider__slide_visible',
      slideDuplicateClass: 'offer-slider__slide_duplicate',
      slideNextClass: 'offer-slider__slide_next',
      slideDuplicateNextClass: 'offer-slider__slide_duplicate_next',
      slidePrevClass: 'offer-slider__slide_prev',
      slideDuplicatePrevClass: 'offer-slider__slide_duplicate_prev',
    });
  }

  function filterTagSlider(el) {
    const newslider = new Swiper(el, {
      speed: 500,
      spaceBetween: 0,
      slidesPerView: 'auto',
      slidesPerGroup: 1,
      roundLengths: true,
      slideClass: 'filter-tag',
      on: {
        init() {
          $(el).addClass('is-visible');
        },
        resize() {
          if (window.Modernizr.mq('(max-width: 1029px)')) {
            $(this.slides).each((ix, slide) => {
              $(slide).removeAttr('style');
            });
          }
        },
      },
    });
  }

  function navigationSlider(el) {
    const startIndex = +$(el).attr('data-first-slide-index') || 0;
    const newslider = new Swiper(el, {
      speed: 300,
      spaceBetween: 0,
      slidesPerView: 'auto',
      slidesPerGroup: 1,
      roundLengths: true,
      initialSlide: startIndex,
      preventInteractionOnTransition: true,
      slideToClickedSlide: true,
      cssMode: true,
      preventClicks: true,
      preventClicksPropagation: true,
      on: {
        init() {
          $(el).addClass('is-visible');
        },
        resize() {
          if (window.Modernizr.mq('(max-width: 1029px)')) {
            $(this.slides).each((ix, slide) => {
              $(slide).removeAttr('style');
            });
          }
        },
        tap(evt) {
          const {
            type,
          } = evt;
          const link = evt.target;
          if ($(link).is('a')) {
            if (type === 'touchend') {
              document.location.href = link.href;
            } else if (type === 'mouseup') {
              evt.preventDefault();
            }
          }
        },
      },
    });
  }

  if (ndGallery.length > 0) {
    $(ndGallery).each((i, el) => {
      gallerySliderInit(el);
    });
  }

  if (ndOfferSlider.length > 0) {
    $(ndOfferSlider).each((i, el) => {
      offerSliderInit(el);
    });
  }

  if (ndFilterTagSlider.length > 0) {
    $(ndFilterTagSlider).each((i, el) => {
      filterTagSlider(el);
    });
  }

  if (ndNavigationSlider.length > 0) {
    $(ndNavigationSlider).each((i, el) => {
      navigationSlider(el);
    });
  }

  window.globalFunctions.gallerySliderInit = gallerySliderInit;
  window.globalFunctions.offerSliderInit = offerSliderInit;

  if (ndDoubleSlider.length > 0) {
    $(ndDoubleSlider).each((i, el) => {
      const btnPrev = $(el).find('.js-slider-button-prev')[0];
      const btnNext = $(el).find('.js-slider-button-next')[0];
      const sliderContainer = $(el).find('.js-slider-container');
      let isCSSMode = false;
      if (detectIt.hasTouch && !window.Modernizr.scrollsnappoints) {
        isCSSMode = true;
        $(el).addClass('is-css-mode-slider');
      } else {
        isCSSMode = false;
        $(el).removeClass('is-css-mode-slider');
      }
      const newslider = new Swiper(sliderContainer, {
        speed: 500,
        spaceBetween: 0,
        slidesPerView: 'auto',
        slidesPerGroup: 1,
        nested: true,
        roundLengths: true,
        noSwiping: true,
        noSwipingClass: 'gallery',
        cssMode: isCSSMode,
        navigation: {
          nextEl: btnNext,
          prevEl: btnPrev,
        },
        breakpoints: {
          320: {
            slidesPerView: 'auto',
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1400: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        },
        on: {
          init() {
            $(sliderContainer).addClass('is-visible');
          },
          resize() {
            if (window.Modernizr.mq('(max-width: 767px)')) {
              $(this.slides).each((ix, slide) => {
                $(slide).removeAttr('style');
              });
            }
          },
        },
      });
    });
  }
}
/* eslint-enable no-unused-vars */
