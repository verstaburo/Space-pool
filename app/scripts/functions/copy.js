const { $ } = window;

export default function copyToClip() {
  $(document).on('click', '.js-copy', (evt) => {
    evt.preventDefault();

    const _this = evt.currentTarget;
    const copyFieldName = $(_this).attr('data-copy-from');
    const copyField = $(`[data-copy-target="${copyFieldName}"]`).get(0);
    const copyMessage = $(`[data-copy-success="${copyFieldName}"]`);
    if (copyField) {
      copyField.select();
      copyField.setSelectionRange(0, 99999);
      document.execCommand('copy');

      if (copyMessage.length > 0) {
        $(copyMessage).addClass('is-active');
        setTimeout(() => {
          $(copyMessage).removeClass('is-active');
        }, 2000);
      }
    }
  });
}
