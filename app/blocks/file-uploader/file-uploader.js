import uid from 'uid';

const $ = window.$;

function fileTemplate(name) {
  const fileEl = document.createElement('div');
  fileEl.classList.add('file');
  fileEl.setAttribute('data-file-body', 'data-file-body');
  const textEl = document.createElement('div');
  textEl.classList.add('file__text');
  textEl.innerText = name;
  const delEl = document.createElement('div');
  delEl.classList.add('close', 'close_small', 'close_gray', 'file__delete', 'js-remove-file');
  delEl.innerHTML = '<svg class="close__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.36 15.36"><rect x="-2.43" y="6.94" width="20.23" height="1.49" transform="translate(18.55 7.68) rotate(135)" /><rect x="-2.43" y="6.94" width="20.23" height="1.49" transform="translate(7.68 -3.18) rotate(45)" /></svg>';
  const inputEl = document.createElement('input');
  inputEl.setAttribute('type', 'hidden');
  inputEl.setAttribute('name', `file[${uid()}]`);
  inputEl.classList.add('file__input');
  fileEl.append(textEl);
  fileEl.append(delEl);
  fileEl.append(inputEl);
  return fileEl;
}

function processingFiles(source, output, block) {
  const files = source;
  const selectedFiles = {};
  const queue = [];
  let fileName;
  for (let i = 0; i < files.length; i += 1) {
    const file = files[i];
    fileName = file.name;
    if (selectedFiles[fileName] === undefined) {
      selectedFiles[fileName] = file;
      queue.push(file);
    }
  }
  while (queue.length !== 0) {
    const file = queue.pop();
    const name = file.name;
    const preview = fileTemplate(name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const inputEl = $(preview).find('input[type="hidden"]');
      $.when($(inputEl).val(e.target.result)).then((input) => {
        input.trigger('FILE_READY_LOAD');
      });
    };
    reader.readAsDataURL(file);
    $(output).append(preview);
    if (queue.length === 0) {
      $(block).addClass('is-ready');
    }
  }
}


export default function fileUploader() {
  $(document).on('change', '.js-file-upload', (evt) => {
    const self = evt.currentTarget;
    const uploaderBlock = $(self).closest('[data-uploader-block]');
    const output = $(uploaderBlock).find('[data-files-output]');
    const card = $(self).closest('[data-uploader-status]');
    $(card).removeClass('is-refused');
    const files = evt.target.files;
    processingFiles(files, output, uploaderBlock);
  });

  /* eslint-disable no-unused-vars */
  function uploadFiles(obj) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 500);
    });
  }
  /* eslint-enable no-unused-vars */

  window.uploadFiles = uploadFiles;

  $(document).on('click', '.js-file-send', (evt) => {
    evt.preventDefault();
    const self = evt.currentTarget;
    const form = $(self).closest('form');
    const uploaderBlock = $(self).closest('[data-uploader-block]');
    const card = $(self).closest('[data-uploader-status]');
    const fn = $(self).attr('data-server-callback');
    $(uploaderBlock).addClass('is-loading');
    window[fn](form[0]).then((redyLoad) => {
      if (redyLoad) {
        $(uploaderBlock).removeClass('is-ready, is-loading');
        $(card).addClass('is-awaiting');
      } else {
        $(uploaderBlock).removeClass('is-loading');
      }
    });
  });
}
