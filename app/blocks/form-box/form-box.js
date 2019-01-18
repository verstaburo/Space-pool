const $ = window.$;

export default function floatingLabel() {
  function preset() {
    $('.form-box input, .form-box textarea').each((i, el) => {
      if ($(el).siblings('input').length === 0) {
        if (el.value.length > 0) {
          $(el).closest('.form-box').addClass('is-top');
        } else {
          $(el).closest('.form-box').removeClass('is-top');
        }
      } else if (el.value.length > 0 || $(el).siblings('input')[0].value.length > 0) {
        $(el).closest('.form-box').addClass('is-top');
      } else {
        $(el).closest('.form-box').removeClass('is-top');
      }
    });
  }

  window.setLabelPosition = preset;

  preset();

  $(document).on('input focus foucsin blur', '.form-box input, .form-box textarea', (evt) => {
    const self = evt.target;
    if ($(self).siblings('input').length === 0) {
      $(self).closest('.form-box').toggleClass('is-top', (evt.type === 'focus' || self.value.length > 0));
    } else if ($(self).siblings('input')[0].value.length === 0) {
      $(self).closest('.form-box').toggleClass('is-top', (evt.type === 'focus' || self.value.length > 0));
    }
  });
}
