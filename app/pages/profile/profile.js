import uid from 'uid';

const $ = window.$;

export default function profile() {
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

  $(document).on('click', '.js-add-ubo', (evt) => {
    evt.preventDefault();
    const self = evt.currentTarget;
    const url = $(self).attr('data-url-template');
    const maxCount = $(self).attr('data-max-ubo-count');
    const ubos = $('[data-ubo-element]');
    const totalUbos = $(ubos).length;
    const lastUbo = ubos[totalUbos - 1];
    if ((maxCount - totalUbos) > 0) {
      loadTemplate(url);
      const uboId = uid();
      const outputTemplate = window.templates.templates.uboForm;
      const newTemplate = outputTemplate.replace(/#uboId/g, uboId);
      const ubo = $(newTemplate);
      $(lastUbo).after(ubo);
      const selects = $(ubo).find('.js-select-input');
      $(selects).each((i, el) => {
        window.inputSelectInit(el);
      });
      const dates = $(ubo).find('.js-datepicker');
      $(dates).each((i, el) => {
        window.simpleDatepickerInit($(el));
      });
      window.setLabelPosition();
      window.setLabelListeners();
      const uboNumbers = $('[data-ubo-number]');
      $(uboNumbers).each((i, el) => {
        $(el).text(i + 1);
      });
      if ((maxCount - totalUbos) === 1) {
        $(self).addClass('is-disabled');
      }
    }
  });
}
