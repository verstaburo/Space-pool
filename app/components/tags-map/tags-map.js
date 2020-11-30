const { $ } = window;

export default function locationTagsMax() {
  function locationLimiter(evt) {
    const _this = evt.currentTarget;
    const tagContainer = $(_this).closest('[data-nd-location-tags]');
    const maxLimit = $(tagContainer).attr('[data-nd-location-tags-max]') || 3;
    const totalCheckedLocation = $('[data-nd-location-tag]:checked').length;

    if (totalCheckedLocation > maxLimit) {
      $(_this).prop('checked', false);
      $(_this).trigger('change');
    }
  }

  $(document).on('change', '[data-nd-location-tag]', locationLimiter);
}
