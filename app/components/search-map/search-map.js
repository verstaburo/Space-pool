import {
  freeze,
  unfreeze,
}
from '../../scripts/functions/freeze';

const $ = window.$;

export function mapManipulations() {
  const bp = window.globalOptions.sizes;
  const mapper = {
    open(mapname) {
      const map = $(`[data-map=${mapname}]`);
      const mapContainer = $(map).find('.map');
      const page = $('.page');
      if (window.Modernizr.mq(`(max-width: ${bp.md - 1}px)`)) {
        freeze();
        $(page).addClass('is-mb-map-active');
      } else {
        $(page).addClass('is-dt-map-active');
      }
      $(mapContainer).trigger('isOpenMap');
    },
    close(mapname) {
      const map = $(`[data-map=${mapname}]`);
      const mapContainer = $(map).find('.map');
      const page = $('.page');
      $(mapContainer).trigger('isCloseMap');
      if (window.Modernizr.mq(`(max-width: ${bp.md - 1}px)`)) {
        unfreeze();
        $(page).removeClass('is-mb-map-active');
      } else {
        $(page).removeClass('is-dt-map-active');
      }
    },
  };

  $(document).on('click', '.js-close-map', (evt) => {
    const self = evt.currentTarget;
    const mapname = $(self).attr('data-target-map');
    $(`.js-show-map[data-target-map="${mapname}"]`).removeClass('is-active');
    mapper.close(mapname);
  });

  $(document).on('click', '.js-show-map', (evt) => {
    const self = evt.currentTarget;
    const mapname = $(self).attr('data-target-map');
    if ($(self).is('.is-active')) {
      $(self).removeClass('is-active');
      mapper.close(mapname);
    } else {
      $(self).addClass('is-active');
      mapper.open(mapname);
      if (window.Modernizr.mq(`(max-width: ${bp.md - 1}px)`)) {
        const activeSlide = $('.js-slider-map').find('.swiper-slide-active');
        const markerId = $(activeSlide).attr('data-map-marker');
        const marker = $(`[data-map-marker-id="${markerId}"]`);
        $(marker).trigger('click');
      }
    }
  });

  // закрываем карту при открытии фильтра
  $(document).on('openSearchFilter', '.page', () => {
    const maps = $('.js-show-map');
    if (window.Modernizr.mq(`(max-width: ${window.globalOptions.sizes.md - 1}px)`)) {
      $(maps).each((i, el) => {
        const mapname = $(el).attr('data-target-map');
        if ($(el).is('.is-active')) {
          $(el).removeClass('is-active');
          mapper.close(mapname);
        }
      });
    }
  });

  // switch map state on page
  $(document).on('click', '.js-toggle-map', (evt) => {
    evt.preventDefault();
    const self = evt.currentTarget;
    const targetMap = $(self).attr('data-target-map');
    const openedName = $(self).attr('data-opened-title');
    const closedName = $(self).attr('data-closed-title');
    const titleBlock = $(self).find('.link__text');
    const map = $(`[data-map=${targetMap}]`);
    const mapContainer = $(map).find('.map');
    if (!$(self).is('.is-active')) {
      mapper.open(targetMap);
      $(self).addClass('is-active');
      $(titleBlock).text(openedName);
      setTimeout(() => {
        $('.js-sticky-block').trigger('sticky_kit:recalc');
        $(mapContainer).trigger('isOpenMap');
      }, 300);
    } else {
      mapper.close(targetMap);
      $(self).removeClass('is-active');
      $(titleBlock).text(closedName);
      setTimeout(() => {
        $(mapContainer).trigger('isCloseMap');
      }, 300);
    }
  });

  // активируем маркер на карте по наведению
  $(document).on('mouseenter', '.js-map-marker-activator', (evt) => {
    const self = evt.currentTarget;
    const markerId = $(self).attr('data-map-marker');
    const marker = $(`[data-map-marker-id="${markerId}"]`);
    $(marker).trigger('click');
  });

  $(document).on('mouseleave', '.js-map-marker-activator', () => {
    $('.map').click();
  });
}

export function ndSearchMapManipulations() {
  $(document).on('change', '.js-search-map-switch', (evt) => {
    const self = evt.currentTarget;
    const isChecked = $(self).prop('checked');
    if (window.Modernizr.mq(`(min-width: ${window.globalOptions.ndsizes.md}px)`)) {
      if (isChecked) {
        $('body').addClass('is-search-map-hide');
      } else {
        $('body').removeClass('is-search-map-hide');
      }
    }
  });

  $(document).on('click', '.js-search-map-show', () => {
    $('body').addClass('is-search-map-active');
    freeze();
  });

  $(document).on('click', '.js-search-map-close', () => {
    $('body').removeClass('is-search-map-active');
    unfreeze();
  });

  $(window).on('resize', () => {
    if (window.Modernizr.mq(`(min-width: ${window.globalOptions.ndsizes.md}px)`)) {
      $('body').removeClass('is-search-map-active');
    } else {
      $('body').removeClass('is-search-map-hide');
      $('.js-search-map-switch').prop('checked', false);
      $('.js-search-map-switch').trigger('change');
    }
  });

  // скрываем кнопку карты при достижении пагинации
  $(window).on('scroll', () => {
    const mapButton = document.querySelector('.js-search-map-show');
    if (mapButton && window.Modernizr.mq(`(max-width: ${window.globalOptions.ndsizes.md}px)`)) {
      const pagination = document.querySelector('.nd-pagination');
      if (pagination) {
        const sB = $(window).height();
        const paginationTop = pagination.getBoundingClientRect().top + 50;
        if (paginationTop > sB) {
          $(mapButton).show();
        } else {
          $(mapButton).hide();
        }
      }
    }
  });
}
