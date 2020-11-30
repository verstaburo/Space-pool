const {
  $,
} = window;

export default () => {
  const toggle = '.js-check-input-toggle input';

  if (!$(toggle).length) return;

  const checkListener = (element) => {
    const parent = $(element).parents('.check-input');

    if ($(element).prop('checked') === true) {
      parent.addClass('active');
    } else {
      parent.find('input[type="text"]').val('').parent().removeClass('is-top');
      parent.removeClass('active');
    }
  };

  $(toggle).each((index, element) => checkListener(element));
  $(document).on('change', toggle, (e) => checkListener(e.target));
};
