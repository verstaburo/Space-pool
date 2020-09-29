import Cropper from 'cropperjs';
import {
  freeze,
  unfreeze,
} from '../../scripts/functions/freeze';

const $ = window.$;

export default function ndCropedImage() {
  function initCrop(image, cropBoxData) {
    const cropedZone = $('[data-cropped-area]');
    $(cropedZone).attr('src', image);
    const cropper = new Cropper(cropedZone[0], {
      restore: true,
      data: cropBoxData,
      guides: false,
      center: false,
      viewMode: 1,
      autoCrop: true,
      responsive: true,
      highlight: false,
      cropBoxMovable: true,
      cropBoxResizable: true,
      background: false,
      toggleDragModeOnDblclick: true,
    });
    cropedZone[0].cropper = cropper;
  }

  function saveCroppedImage(source) {
    const cropedZone = $('[data-cropped-area]').get(0);
    const cropper = cropedZone.cropper;
    const img = cropper.getCroppedCanvas({
      minWidth: 1024,
      imageSmoothingEnabled: false,
      imageSmoothingQuality: 'high',
    });
    const imgfinal = img.toDataURL('image/jpeg');
    const cropBox = JSON.stringify(cropper.getData(true));
    const inputName = $(source).attr('data-name-crop-input');
    let input = $(source).find(`input[name*="${inputName}"`);
    let cropInput = $(source).find('input[name*="viewData"]');
    const image = $(source).find('[data-preview-image] img').get(0);

    // записываем данные обрезки
    if ($(cropInput).length > 0) {
      $.when($(cropInput).val(cropBox)).then(inp => $(inp).trigger('change'));
    } else {
      cropInput = document.createElement('input');
      cropInput.setAttribute('type', 'hidden');
      cropInput.setAttribute('name', 'viewData[0]');
      $(cropInput).prependTo(source);
      const newInput = $(source).find('[name*="viewData"]');
      $.when($(newInput).val(cropBox)).then(inp => $(inp).trigger('change'));
    }

    // записываем данные обрезанного изображения
    if ($(input).length > 0) {
      $.when($(input).val(imgfinal)).then(inp => $(inp).trigger('change'));
      $(image).attr('src', imgfinal);
    } else {
      input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', `${inputName}[0]`);
      $(input).prependTo(source);
      const newInput = $(source).find(`input[name*="${inputName}"`);
      $(image).attr('src', imgfinal);
      $.when($(newInput).val(imgfinal)).then(inp => $(inp).trigger('change'));
    }
    window.globalFunctions.updateIndexesAtPreviews();
    $.fancybox.close();
  }

  function removeCropper() {
    const cropedZone = $('[data-cropped-area]').get(0);
    cropedZone.cropper.destroy();
  }

  $(document).on('click', '.js-crop-image', (evt) => {
    evt.preventDefault();
    const _this = evt.currentTarget;
    const popupName = $(_this).attr('href').split('#').pop();
    const popup = $(`#${popupName}`).get(0);
    const preview = $(_this).closest('[data-preview-item]');
    const inputName = $(preview).attr('data-name-original-input');
    const imageInput = $(preview).find(`input[name*="${inputName}"`);
    if (imageInput.length > 0) {
      const image = $(imageInput).val();
      const cropInput = $(preview).find('[name*="viewData"]');
      let cropData = false;
      if (cropInput.length > 0) {
        cropData = JSON.parse($(cropInput).val());
      }
      popup.initialSource = preview;
      window.globalFunctions.openPopup(popup, '', {
        baseClass: 'fancybox--nd',
        infobar: false,
        autoFocus: false,
        animationDuration: 500,
        animationEffect: 'fade',
        transitionEffect: 'fade',
        clickSlide: false,
        onDeactivate(i) {
          i.close();
        },
        onActivate() {
          freeze();
        },
        beforeShow() {
          initCrop(image, cropData);
        },
        afterLoad() {
          freeze();
        },
        beforeClose() {
          unfreeze();
        },
        afterClose: removeCropper,
        smallBtn: false,
        toolbar: false,
        touch: false,
        idleTime: false,
        gutter: 0,
        preventCaptionOverlap: false,
      });
    }
  });

  $(document).on('click', '.js-preview-save-crop', (evt) => {
    evt.preventDefault();
    const _this = evt.currentTarget;
    const popup = $(_this).closest('.nd-popup').get(0);
    const source = popup.initialSource;
    saveCroppedImage(source);
  });
}
