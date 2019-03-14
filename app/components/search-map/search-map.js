import {
  freeze,
  unfreeze,
} from '../../blocks/js-functions/freeze';

const $ = window.$;

export default function mapManipulations() {
  const bp = window.globalOptions.sizes;
  const mapper = {
    open(mapname) {
      freeze();
      const map = $(`[data-map=${mapname}]`);
      const mapContainer = $(map).find('.map');
      $(map).removeClass('is-closed');
      $(mapContainer).trigger('isOpenMap');
    },
    close(mapname) {
      unfreeze();
      const map = $(`[data-map=${mapname}]`);
      const mapContainer = $(map).find('.map');
      $(map).addClass('is-closed');
      $(mapContainer).trigger('isCloseMap');
    },
  };

  // открываем скрываем или показываем карту
  function mapState() {
    const maps = $('[data-map]');
    const mapContainers = $(maps).find('.map');
    if (maps.length > 0) {
      if (window.Modernizr.mq(`(max-width: ${bp.md - 1}px)`)) {
        $(maps).each((i, el) => {
          const mapName = $(el).attr('data-map');
          const isActive = $(`.js-show-map[data-target-map="${mapName}"]`).is('.is-active');
          const mapContainer = $(el).find('.map');
          if (isActive) {
            freeze();
            $(el).removeClass('is-closed');
            $(mapContainer).trigger('isOpenMap');
          } else {
            unfreeze();
            $(el).addClass('is-closed');
            $(mapContainer).trigger('isCloseMap');
          }
        });
      } else {
        unfreeze();
        $(mapContainers).trigger('isOpenMap');
        $(maps).removeClass('is-closed');
        $('.js-show-map').removeClass('is-active');
      }
    }
  }

  mapState();
  $(window).on('resize', mapState);

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
    if ($(map).is('.is-closed')) {
      $(map).removeClass('is-closed');
      $(titleBlock).text(openedName);
      setTimeout(() => {
        $('.js-sticky-block').trigger('sticky_kit:recalc');
        $(mapContainer).trigger('isOpenMap');
      }, 300);
    } else {
      $(map).addClass('is-closed');
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
