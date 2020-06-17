const $ = window.$;

export default function numberinput() {
  $(document).on('click', '.js-numberbox-minus, .js-numberbox-plus', function (e) {
    e.preventDefault();

    const input = $(this).closest('.input-numberbox, .input-numbers, .nd-input-numberbox').find('.js-numberbox-input');
    let val;
    const min = parseInt($(input).attr('data-min'), 10) || 0;
    const max = parseInt($(input).attr('data-max'), 10) || false;

    const minus = $(this).is('[class*="minus"]') || false;

    if (!input.val()) {
      val = min;
      input.val(min);
    } else {
      val = +input.val();
    }

    if (minus) {
      input.val(val > min ? (val -= 1) : min);
    } else if (max) {
      input.val(val < max ? (val += 1) : max);
    } else {
      input.val(val += 1);
    }
    input[0].focus();
  });

  $(document).on('keyup change', '.js-numberbox-input', function () {
    const min = parseInt($(this).attr('data-min'), 10) || 0;
    const max = parseInt($(this).attr('data-max'), 10) || false;
    this.value = this.value.replace(/[^\d]/, '');
    if ($(this).val() < min) $(this).val(min);
    if (max && $(this).val() > max) $(this).val(max);
    this.focus();
  });
}
