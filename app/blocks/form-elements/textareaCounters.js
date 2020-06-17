const $ = window.$;

export default function textareaCounters() {
  function counterUpdate(evt) {
    const self = evt.currentTarget;
    const counterField = $(self).siblings('[data-symbol-counter]');
    const value = $(self).val().length;
    const startValue = parseInt($(self).attr('maxlength'), 10);
    const diff = startValue - value;
    $(counterField).text(diff);
  }
  $(document).on('input', '.js-textarea-counter', counterUpdate);
  $(document).on('change', '.js-textarea-counter', counterUpdate);
}
