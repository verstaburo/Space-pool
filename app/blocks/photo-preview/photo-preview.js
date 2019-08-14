import Cropper from 'cropperjs';

const $ = window.$;

export default function photoPreview() {
  function initCrop(starter) {
    const preview = $(starter).closest('[data-preview-item]');
    const inputName = $(preview).attr('data-name-crop-input');
    const image = $(preview).find('[data-crop-image]');
    const cropper = new Cropper(image[0], {
      aspectRatio: (1064 / 596),
      dragMode: 'move',
      viewMode: 1,
      autoCropArea: 1,
      restore: true,
      guides: false,
      center: false,
      responsive: true,
      highlight: false,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      toggleDragModeOnDblclick: false,
      crop() {
        const img = this.cropper.getCroppedCanvas({
          minWidth: 800,
          maxWidth: 4096,
          imageSmoothingEnabled: false,
          imageSmoothingQuality: 'high',
        });
        const imgfinal = img.toDataURL('image/jpeg');
        let input = $(preview).find('[data-file-crop]');
        if ($(input).length > 0) {
          $.when($(input).val(imgfinal)).then(inp => $(inp).trigger('change'));
        } else {
          input = document.createElement('input');
          input.setAttribute('type', 'hidden');
          input.setAttribute('name', inputName);
          input.setAttribute('data-file-crop', 'data-file-crop');
          $(preview).append(input);
          const newInput = $(preview).find('[data-file-crop]');
          $.when($(newInput).val(imgfinal)).then(inp => $(inp).trigger('change'));
        }
      },
    });
    preview[0].cropper = cropper;
    $(preview).addClass('is-cropper-active');
  }

  function removeCropper(cropped) {
    const input = $(cropped).find('[data-file-crop]');
    cropped.cropper.destroy();
    $(cropped).removeClass('is-cropper-active');
    $(input).remove();
  }

  const starter = $('[data-crop-starter]:checked');
  if (starter.length > 0) {
    initCrop(starter);
  }

  $(document).on('change', '[data-crop-starter]', (evt) => {
    const self = evt.currentTarget;
    const lastCropped = $('.is-cropper-active')[0];
    removeCropper(lastCropped);
    initCrop(self);
  });
}
