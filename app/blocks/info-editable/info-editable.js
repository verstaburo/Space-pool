const $ = window.$;
const bp = window.globalOptions.sizes;

export default function infoEditable() {
  $(document).on('click', '.js-field-edit', (evt) => {
    evt.preventDefault();
    const self = evt.currentTarget;
    const editFieldData = $(self).attr('data-edit-target');
    const editField = $(`[data-field-edit="${editFieldData}"]`);
    $(editField).removeAttr('readonly');
    setTimeout(() => {
      $(editField).focus();
    }, 50);
  });

  $(document).on('keydown', '[data-field-edit]', (evt) => {
    evt.stopPropagation();
    const self = evt.currentTarget;
    const key = evt.which;
    if (key === 13) {
      if (window.Modernizr.mq(`(min-width: ${bp.md}px)`)) {
        $(self).attr('readonly', 'readonly');
      }
    }
  });

  $(document).on('blur', '[data-field-edit]', (evt) => {
    const self = evt.currentTarget;
    if (window.Modernizr.mq(`(min-width: ${bp.md}px)`)) {
      $(self).attr('readonly', 'readonly');
    }
  });
}
