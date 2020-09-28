/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import {
  Sortable,
  Swap,
  AutoScroll,
} from 'sortablejs/modular/sortable.core.esm';

Sortable.mount(new Swap());
Sortable.mount(new AutoScroll());

const $ = window.$;

export default function uploader() {
  function loadTemplate(url) {
    if (window.templates === undefined) {
      $.ajax(url, {
        dataType: 'json',
        async: false,
        type: 'GET',
        complete(answer) {
          window.templates = answer.responseJSON;
        },
      });
    }
  }

  function updateAllPreviewIndex() {
    const previews = $('[data-preview-item]');
    $(previews).each((index, el) => {
      const names = $(el).find('[name]');
      const number = $(el).find('[data-preview-number]');
      $(names).each((ix, inpts) => {
        const inputName = $(inpts).attr('name');
        if (inputName) {
          const inpName = inputName.split('[');
          if (inpName.length > 1) {
            $(inpts).attr('name', `${inpName[0]}[${index}]`);
          }
        }
      });
      $(number).text(index + 1);
      if (index === 0) {
        $(el).addClass('is-main');
      } else {
        $(el).removeClass('is-main');
      }
    });
  }

  window.globalFunctions.updateIndexesAtPreviews = updateAllPreviewIndex;

  function draggableListInit() {
    const list = $('[data-draggable-list]');
    if (list.length) {
      $(list).each((i, el) => {
        const srt = new Sortable(el, {
          draggable: '[data-draggable-item]',
          filter: '[data-insert-preview]',
          onEnd: updateAllPreviewIndex,
          swap: true,
          scroll: true,
          scrollSensitivity: 30,
          scrollSpeed: 10,
          bubbleScroll: true,
        });
      });
    }
  }

  function processingImages(source, tests, field) {
    const files = source;
    const selectedFiles = {};
    const queue = [];
    const conditions = tests;
    let fileName;
    const counter = $('[data-file-counter]');
    const totalPreviews = $('[data-preview-item]').length;
    // проверяем существующее количество на превышение
    if (totalPreviews !== conditions.maxCount) {
      // количество загруженных файлов
      const loadingCount = files.length;
      // количество свободных мест
      const freeCount = (conditions.maxCount - totalPreviews);
      // определяем количество загружаемых файлов
      const finalCount = (loadingCount > freeCount) ? freeCount : loadingCount;
      for (let i = 0; i < finalCount; i += 1) {
        const file = files[i];
        fileName = file.name;
        if (selectedFiles[fileName] === undefined) {
          selectedFiles[fileName] = file;
          queue.push(file);
        }
      }
      if (finalCount === freeCount) {
        $('[data-upload-area]').addClass('is-limit');
      }
      while (queue.length !== 0) {
        const index = (queue.length + totalPreviews) - 1;
        const file = queue.pop();
        const name = file.name;
        const type = file.type.split('/');
        const ext = name.split('.').pop();
        // const size = file.size;
        let isImage = false;
        let errorMessage = '';
        const outputTemplate = window.templates.templates.photoPreview;
        // проверяем размер файла
        // if (size < conditions.minSize) {
        //   errorMessage = 'This image is really tiny.';
        // }
        // if (size > conditions.maxSize) {
        //   errorMessage = 'This image is really big.';
        // }
        // проверяем что изображение
        if (type[0] === 'image') {
          isImage = true;
        } else {
          errorMessage = 'This is not an image';
        }
        // проверяем расширение
        if (conditions.formats.search(ext) === -1) {
          isImage = false;
          errorMessage = 'Wrong image format';
        }
        const newTemplate = outputTemplate.replace(/#fileIndex/g, index);
        const preview = $(newTemplate);
        const previewEl = $(preview).find('[data-preview-item]');
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          const imgEtalon = new Image();
          imgEtalon.onload = function () {
            const width = this.width;
            const height = this.height;
            if (width < conditions.shortSide || height < conditions.shortSide) {
              errorMessage = 'This photo is too small';
              $(preview).find('[data-preview-error-text]').text(errorMessage);
              $(previewEl).addClass('is-error');
            } else {
              img.src = e.target.result;
              const inputEl = document.createElement('input');
              inputEl.setAttribute('type', 'hidden');
              const inputName = $(previewEl).attr('data-name-original-input');
              inputEl.setAttribute('name', `${inputName}[${index}]`);
              $.when($(inputEl).val(e.target.result)).then((input) => {
                $(input).prependTo(previewEl);
                input.trigger('IMG_READY_FOR_LOAD');
                updateAllPreviewIndex();
              });
              $(preview).find('[data-preview-image]').append(img);
              if (errorMessage.length > 0) {
                $(preview).find('[data-preview-error-text]').text(errorMessage);
                $(previewEl).addClass('is-error');
              }
            }
          };
          imgEtalon.src = e.target.result;
        };
        if (isImage) {
          reader.readAsDataURL(file);
        } else {
          $(preview).find('[data-preview-error-text]').text(errorMessage);
          $(previewEl).addClass('is-error');
        }
        if (conditions.maxCount > 0) {
          $(counter).text(`${totalPreviews + 1}/${conditions.maxCount}`);
        }
        $('[data-insert-preview]').before(preview);
        const selectEl = $(preview).find('.js-nd-select').get(0);
        window.ndSelectInput(selectEl);
        $('[data-upload-area]').trigger('changeItems');
        if (field) {
          const inpWrap = $(field).closest('.js-upload-file');
          const frm = document.createElement('FORM');
          const inp = field;
          $(frm).append(inp);
          frm.reset();
          inpWrap.append(inp);
        }
      }
    }
  }

  $('.js-upload-file')
    .on('drag dragstart dragend dragover dragenter dragleave drop', (evt) => {
      evt.preventDefault();
      evt.stopPropagation();
    })
    .on('dragover dragenter', (evt) => {
      const self = evt.currentTarget;
      $(self).addClass('is-dragover');
    })
    .on('dragleave dragend drop', (evt) => {
      const self = evt.currentTarget;
      $(self).removeClass('is-dragover');
    })
    .on('drop', (evt) => {
      const self = evt.currentTarget;
      const url = $(self).attr('data-url-template');
      loadTemplate(url);
      const conditions = {};
      conditions.shortSide = parseInt($(self).attr('data-short-side'), 10) || 0;
      // conditions.minSize = parseInt($(self).attr('data-min-size'), 10) || 0;
      // conditions.maxSize = parseInt($(self).attr('data-max-size'), 10) || '1000000000000';
      conditions.formats = $(self).attr('data-format');
      conditions.maxCount = parseInt($(self).attr('data-total-count'), 10);
      const droppedFiles = evt.originalEvent.dataTransfer.files;
      processingImages(droppedFiles, conditions);
    });

  $(document).on('change', '.js-upload-file input', (evt) => {
    const self = $(evt.target).closest('.js-upload-file');
    const url = $(self).attr('data-url-template');
    loadTemplate(url);
    const files = evt.target.files;
    const conditions = {};
    conditions.shortSide = parseInt($(self).attr('data-short-side'), 10) || 0;
    // conditions.minSize = parseInt($(self).attr('data-min-size'), 10) || 0;
    // conditions.maxSize = parseInt($(self).attr('data-max-size'), 10) || '1000000000000';
    conditions.formats = $(self).attr('data-format');
    conditions.maxCount = parseInt($(self).attr('data-total-count'), 10) || -1;
    processingImages(files, conditions, evt.currentTarget);
  });

  $(document).on('changeItems', '[data-upload-area]', (evt) => {
    const self = evt.target;
    const totalPreviews = $('[data-preview-item]').length;
    const counter = $('[data-file-counter]');
    const input = $('.js-upload-file')[0];
    const maxCount = $(input).attr('data-total-count') || -1;
    const errors = $('.is-error[data-preview-item]').length;
    if (totalPreviews === 0) {
      $(self).addClass('is-empty');
      $('[type="submit"]').attr('disabled', 'disabled');
      $('[type="submit"]').addClass('is-disabled');
    } else {
      if (!errors > 0) {
        $('[type="submit"]').removeAttr('disabled');
        $('[type="submit"]').removeClass('is-disabled');
      }
      if (totalPreviews >= maxCount) {
        $('[data-upload-area]').addClass('is-limit');
      } else {
        $('[data-upload-area]').removeClass('is-limit');
      }
      $(self).removeClass('is-empty');
    }
    if (maxCount > 0) {
      $(counter).text(`${totalPreviews} / ${maxCount}`);
    } else {
      $(counter).text('');
    }
    updateAllPreviewIndex();
  });

  /* eslint-disable no-unused-vars */
  function deleteOnBackend(obj) {
    return new Promise((resolve) => {
      resolve(true);
    });
  }
  /* eslint-enable no-unused-vars */

  window.deleteOnBackend = deleteOnBackend;

  $(document).on('click', '.js-delete-file', (evt) => {
    evt.preventDefault();
    const self = evt.currentTarget;
    const preview = $(self).closest('[data-preview-item]');
    const fn = $(preview).attr('data-callback');
    const previewParentCol = $(preview).closest('[data-draggable-item]');
    const el = previewParentCol;
    window[fn]($(el)).then((redyDelete) => {
      if (redyDelete) {
        $(el).remove();
        $('[data-upload-area]').trigger('changeItems');
      }
    });
  });

  window.draggableListInit = draggableListInit;

  const dragList = document.querySelectorAll('[data-draggable-list]');
  if (dragList) {
    draggableListInit();
  }
}
/* eslint-enable no-unused-vars */
/* eslint-enable max-len */
