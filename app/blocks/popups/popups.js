// http://fancyapps.com/fancybox/3/
import '@fancyapps/fancybox';

import {
  freeze,
  unfreeze,
} from '../js-functions/freeze';

const $ = window.$;

export default function popups() {
  $('.js-popup').fancybox({
    afterLoad: freeze,
    afterClose: unfreeze,
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
}
