const $ = window.$;

export default function toggleMap() {
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
}
