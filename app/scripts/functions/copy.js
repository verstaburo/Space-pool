const $ = window.$;

export default function copyToClip() {
  $(document).on('click', '.js-copy', (evt) => {
    evt.preventDefault();

    const _this = evt.currentTarget;
    const copyFieldName = $(_this).attr('data-copy-from');
    const copyField = $(`[data-copy-target="${copyFieldName}"]`).get(0);
    if (copyField) {
      copyField.select();
      copyField.setSelectionRange(0, 99999);
      document.execCommand('copy');
    }
  });
}
