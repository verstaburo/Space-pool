const $ = window.$;

export default function formSubmitSwitch() {
  function detection(evt) {
    const _this = evt.currentTarget;
    const form = $(_this).closest('form');
    const allRequired = $(form).find('[required]');
    const isFilled = $(allRequired).filter((i, el) => (el.value.replace(/\s+/g, ' ').trim().length === 0));
    const submitButton = $(form).find('[type="submit"]');
    if (isFilled.length > 0) {
      $(submitButton).attr('disabled', 'disabled');
    } else {
      $(submitButton).removeAttr('disabled');
    }
  }

  $(document).on('input', '[data-submit-disabled] [required]', detection);
  $(document).on('change', '[data-submit-disabled] [required]', detection);
}
