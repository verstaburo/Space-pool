const { $ } = window;

// определяем дефолтное изображение (на случай ресета)
function defaultImage() {
  const images = $('[data-image-preview]').find('img');
  $(images).each((i, el) => {
    const imageSrc = $(el).attr('src');
    $(el).attr('data-default-path', imageSrc);
  });
}

// подгружаем загруженую фотку  в превью
function uploadImage(target) {
  const self = target;
  const container = $(self).closest('[data-upload-container]');
  const imageContainer = $(container).find('[data-image-preview]');
  const image = $(imageContainer).find('img')[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    $(image).attr('src', e.target.result);
  };

  if (self.files[0]) {
    const file = self.files[0];
    const type = file.type.split('/');

    // if (self.files[0]) {
    if (type[0] === 'image') {
      reader.readAsDataURL(self.files[0]);
    }
  }
}

defaultImage();

// ловим подгуженный файл
$(document).on('change', '.js-upload-image', (evt) => {
  uploadImage(evt.target);
});

$(document).on('click', '[data-uploader-clear]', (evt) => {
  evt.preventDefault();
  const self = evt.currentTarget;
  const uploaderName = $(self).attr('data-uploader-clear');
  const fn = $(self).attr('data-callback');
  const input = $(`[data-avatar-uploader="${uploaderName}"]`);
  window[fn](input).then((readySaved) => {
    if (readySaved) {
      const inputParent = $(input).parent();
      const uploaderContainer = $(input).closest('[data-upload-container]');
      const imageBlock = $(uploaderContainer).find('[data-image-preview] img');
      const form = document.createElement('form');
      $(form).append(input);
      form.reset();
      $(imageBlock).attr('src', "data:image/svg+xml,%3Csvg viewBox='0 0 1 1'xmlns='http://www.w3.org/2000/svg'%3E/svg%3E");
      $(inputParent).prepend(input);
      $(input).trigger('change');
    }
  });
});
