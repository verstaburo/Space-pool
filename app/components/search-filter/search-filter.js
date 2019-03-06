const $ = window.$;

export default function toggleMap() {
  // switch map state on page
  $(document).on('click', '.js-toggle-map', (evt) => {
    evt.preventDefault();
    const self = evt.currentTarget;
    const targetMap = $(self).attr('data-target-map');
    const map = $(`[data-map=${targetMap}]`);
    const mapContainer = $(map).find('.map');
    if ($(map).is('.is-closed')) {
      $(map).removeClass('is-closed');
      $(mapContainer).trigger('isOpenMap');
    } else {
      $(map).addClass('is-closed');
    }
  });
}
