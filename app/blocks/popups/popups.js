// http://fancyapps.com/fancybox/3/
import '@fancyapps/fancybox';
import {
  freeze,
  unfreeze,
} from '../js-functions/freeze';

const $ = window.$;
const bp = window.globalOptions.sizes;

export default function popups() {
  // настройки стандартного попапа
  const optionsStPopup = {
    autoFocus: false,
    animationDuration: 400,
    transitionDuration: 400,
    onDeactivate(i) {
      i.close();
    },
    onActivate() {
      freeze();
    },
    afterLoad() {
      freeze();
    },
    afterShow(i) {
      const popup = $(i.slides[0].src);
      $(popup).trigger('POPUP_SHOW');
      const stage = i.$refs.container;
      $(stage).addClass('is-fancybox-animation-show');
    },
    beforeClose(i) {
      const stage = i.$refs.container;
      $(stage).removeClass('is-fancybox-animation-show');
    },
    afterClose(i) {
      const panel = $('.panel');
      if (!($(panel).length > 0 && $(panel).is('.is-open'))) {
        unfreeze();
      }
      const popup = $(i.slides[0].src);
      if ($(popup).is('.popup-arrange-viewing')) {
        const sections = $('[data-record-step]');
        const sectionFirst = $('[data-record-step="1"]');
        const slider = $(popup).find('.js-slider-container');
        $(sections).removeClass('is-active');
        $(sectionFirst).addClass('is-active');
        window.setCurrentDateInPopup();
        const currMonth = (new Date()).getMonth();
        slider[0].swiper.slideTo(currMonth, 0);
      }
    },
    btnTpl: {
      smallBtn: '<button type="button" data-fancybox-close class="fancybox-button popup__close" title="{{CLOSE}}"><svg class="popup__close-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.36 15.36"><rect x="-2.43" y="6.94" width="20.23" height="1.49" transform="translate(18.55 7.68) rotate(135)"/><rect x="-2.43" y="6.94" width="20.23" height="1.49" transform="translate(7.68 -3.18) rotate(45)"/></svg></button>',
    },
    touch: false,
  };

  // настройки мобильного попапа
  const optionsMobPopup = {
    autoFocus: false,
    animationEffect: 'fade',
    animationDuration: 400,
    transitionDuration: 400,
    transitionEffect: 'fade',
    onDeactivate(i) {
      i.close();
    },
    onActivate() {
      freeze();
    },
    afterLoad() {
      freeze();
    },
    afterShow(i) {
      const stage = i.$refs.container;
      const popup = $(i.slides[0].src);
      $(stage).addClass('is-animation-show');
      $(popup).trigger('POPUP_SHOW');
    },
    beforeClose(i) {
      const stage = i.$refs.container;
      $(stage).removeClass('is-animation-show');
    },
    afterClose() {
      const panel = $('.panel');
      if (!($(panel).length > 0 && $(panel).is('.is-open'))) {
        unfreeze();
      }
    },
    btnTpl: {
      smallBtn: '<button type="button" data-fancybox-close class="fancybox-button popup__close" title="{{CLOSE}}"><svg class="popup__close-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.36 15.36"><rect x="-2.43" y="6.94" width="20.23" height="1.49" transform="translate(18.55 7.68) rotate(135)"/><rect x="-2.43" y="6.94" width="20.23" height="1.49" transform="translate(7.68 -3.18) rotate(45)"/></svg></button>',
    },
    touch: false,
    baseTpl: '<div class="fancybox-container fancybox-container_shift" role="dialog" tabindex="-1">' +
      '<div class="fancybox-inner">' +
      '<div class="fancybox-infobar"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div>' +
      '<div class="fancybox-toolbar">{{buttons}}</div>' +
      '<div class="fancybox-navigation">{{arrows}}</div>' +
      '<div class="fancybox-stage"></div>' +
      '<div class="fancybox-caption"></div>' +
      '</div' +
      '</div>',
  };

  // настройки стандартного попапа не центрированного
  const optionsStPopupTop = {
    autoFocus: false,
    animationDuration: 400,
    transitionDuration: 400,
    onDeactivate(i) {
      i.close();
    },
    onActivate() {
      freeze();
    },
    afterLoad() {
      freeze();
    },
    afterShow(i) {
      const popup = $(i.slides[0].src);
      $(popup).trigger('POPUP_SHOW');
      const stage = i.$refs.container;
      $(stage).addClass('is-fancybox-animation-show');
    },
    beforeClose(i) {
      const stage = i.$refs.container;
      $(stage).removeClass('is-fancybox-animation-show');
    },
    afterClose(i) {
      const panel = $('.panel');
      if (!($(panel).length > 0 && $(panel).is('.is-open'))) {
        unfreeze();
      }
      const popup = $(i.slides[0].src);
      if ($(popup).is('.popup-arrange-viewing')) {
        const sections = $('[data-record-step]');
        const sectionFirst = $('[data-record-step="1"]');
        const slider = $(popup).find('.js-slider-container');
        $(sections).removeClass('is-active');
        $(sectionFirst).addClass('is-active');
        window.setCurrentDateInPopup();
        const currMonth = (new Date()).getMonth();
        slider[0].swiper.slideTo(currMonth, 0);
      }
    },
    btnTpl: {
      smallBtn: '<button type="button" data-fancybox-close class="fancybox-button popup__close" title="{{CLOSE}}"><svg class="popup__close-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.36 15.36"><rect x="-2.43" y="6.94" width="20.23" height="1.49" transform="translate(18.55 7.68) rotate(135)"/><rect x="-2.43" y="6.94" width="20.23" height="1.49" transform="translate(7.68 -3.18) rotate(45)"/></svg></button>',
    },
    touch: false,
    baseTpl: '<div class="fancybox-container fancybox-container_nocenter" role="dialog" tabindex="-1">' +
      '<div class="fancybox-bg"></div>' +
      '<div class="fancybox-inner">' +
      '<div class="fancybox-infobar"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div>' +
      '<div class="fancybox-toolbar">{{buttons}}</div>' +
      '<div class="fancybox-navigation">{{arrows}}</div>' +
      '<div class="fancybox-stage"></div>' +
      '<div class="fancybox-caption"></div>' +
      '</div' +
      '</div>',
  };

  // $('.js-popup').fancybox(optionsStPopup);
  // $('.js-popup-mobile').fancybox(optionsMobPopup);

  window.globalFunctions.openPopup = (popupEl, isMobile) => {
    const options = isMobile ? optionsMobPopup : optionsStPopup;
    $.fancybox.open({
      src: popupEl,
      type: 'inline',
      opts: options,
    });
  };

  $(document).on('click', '.js-popup', (evt) => {
    const self = evt.currentTarget;
    if ($(self).attr('data-stoppropagation')) {
      evt.stopPropagation();
    }
    const data = $(self).attr('data-src') || $(self).attr('href');
    const popupId = `#${data.split('#').pop()}`;
    const source = $(popupId);
    $.fancybox.open({
      src: source,
      type: 'inline',
      opts: optionsStPopup,
    });
  });

  $(document).on('click', '.js-popup-top', (evt) => {
    const self = evt.currentTarget;
    if ($(self).attr('data-stoppropagation')) {
      evt.stopPropagation();
    }
    const data = $(self).attr('data-src') || $(self).attr('href');
    const popupId = `#${data.split('#').pop()}`;
    const source = $(popupId);
    $.fancybox.open({
      src: source,
      type: 'inline',
      opts: optionsStPopupTop,
    });
  });

  $(document).on('click', '.js-popupj-mobile', (evt) => {
    const self = evt.currentTarget;
    if ($(self).attr('data-stoppropagation')) {
      evt.stopPropagation();
    }
    const data = $(self).attr('data-src') || $(self).attr('href');
    const popupId = `#${data.split('#').pop()}`;
    const source = $(popupId);
    $.fancybox.open({
      src: source,
      type: 'inline',
      opts: optionsMobPopup,
    });
  });

  $(document).on('click', '.js-popup-depends-width', (evt) => {
    evt.preventDefault();
    const self = evt.currentTarget;
    if ($(self).attr('data-stoppropagation')) {
      evt.stopPropagation();
    }
    const data = self.getAttribute('data-source').split(',');
    const sources = {};
    const keys = [];
    let source;
    let result = false;
    for (let i = 0, l = data.length; i < l; i += 1) {
      const item = data[i].split(':');
      sources[item[0]] = item[1];
      if (item[0] !== 'xl') {
        keys.push(item[0]);
      }
    }
    for (let i = 0, l = keys.length; i < l; i += 1) {
      if (window.Modernizr.mq(`(max-width: ${bp[keys[i]] - 1}px)`) && !result) {
        source = sources[keys[i]];
        $.fancybox.open({
          src: source,
          type: 'inline',
          opts: optionsMobPopup,
        });
        result = true;
      }
    }
    if (!result) {
      source = sources.xl;
      $.fancybox.open({
        src: source,
        type: 'inline',
        opts: optionsStPopup,
      });
    }
  });

  // Open the gallery in the slider on the page space.html
  // trigger buttons
  $(document).on('click', '.js-open-gallery', (evt) => {
    evt.preventDefault();
    const self = $(evt.target).is('.js-open-gallery') ? $(evt.target) : $(evt.target).closest('.js-open-gallery');
    // именование галереи
    const targetName = $(self).attr('data-targets');
    // родительский контейнер
    const parentSlider = $(self).closest('.slider');
    // ищем не дублирующиеся слайды
    const slides = $(parentSlider).find('.swiper-slide:not(.swiper-slide-duplicate)');
    // из них выбираем те, которые являются целевыми для галереи
    const targets = $(slides).filter((i, el) => $(el).is(`[data-target="${targetName}"]`));
    // массив для храниения источников изображений
    let galleryItems = [];
    // переменная для определения текущего активного элемента
    let activeIndex = 0;
    $(targets).each((i, el) => {
      const src = $(el).attr('src');
      // определяем индекс активного элемента
      if ($(el).is('.swiper-slide-active')) {
        activeIndex = i;
      }
      // делаем первичноге наполнение массива
      galleryItems.push({
        src,
      });
    });
    // переставляем элементы внутри массива таким образом чтобы первым был активный
    if (activeIndex) {
      const tailGallery = galleryItems.splice(activeIndex);
      galleryItems = tailGallery.concat(galleryItems);
    }
    // открываем галлерею
    $.fancybox.open(galleryItems, {
      loop: true,
      afterLoad: freeze,
      afterClose: unfreeze,
      baseTpl: '<div class="fancybox-container" role="dialog" tabindex="-1">' +
        '<div class="fancybox-bg fancybox-bg_dark"></div>' +
        '<div class="fancybox-inner">' +
        '<div class="fancybox-infobar"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div>' +
        '<div class="fancybox-toolbar">{{buttons}}</div>' +
        '<div class="fancybox-navigation">{{arrows}}</div>' +
        '<div class="fancybox-stage"></div>' +
        '<div class="fancybox-caption"></div>' +
        '</div' +
        '</div>',
    });
  });

  $(document).on('click', '.js-show-pfooter', (evt) => {
    evt.preventDefault();
    const self = evt.currentTarget;
    const footer = $(self).closest('.popup__footer');
    $(footer).toggleClass('is-open');
  });
}
