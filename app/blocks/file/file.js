const $ = window.$;

export default function fileRemove() {
  $(document).on('click', '.js-remove-file', (evt) => {
    evt.preventDefault();
    const self = evt.currentTarget;
    const fileEl = $(self).closest('[data-file-body]');
    const fileOutput = $(fileEl).closest('[data-files-output]');
    const fileBlock = $(fileEl).closest('[data-uploader-block]');
    const totalFiles = $(fileOutput).find('[data-file-body]');
    if (totalFiles.length === 1) {
      $(fileEl).remove();
      $(fileBlock).removeClass('is-ready');
    } else {
      $(fileEl).remove();
    }
  });
}
