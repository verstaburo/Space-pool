const $ = window.$;

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

  const file = self.files[0];
  const type = file.type.split('/');

  if (type[0] === 'image') {
    reader.readAsDataURL(self.files[0]);
  }
}

defaultImage();

// ловим подгуженный файл
$(document).on('change', '.js-upload-image', (evt) => {
  uploadImage(evt.target);
});
