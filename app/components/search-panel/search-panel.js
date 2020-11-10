const $ = window.$;

export default function ShiftInputLocationOnFocus() {
  $(document).on('focus', '.js-shift-on-focus', (evt) => {
    const _this = evt.currentTarget;
    const topParent = $(_this).closest('[data-step]');
    $(topParent).addClass('is-shifted');
  });

  $(document).on('blur', '.js-shift-on-focus', (evt) => {
    const _this = evt.currentTarget;
    const topParent = $(_this).closest('[data-step]');
    $(topParent).removeClass('is-shifted');
  });
}
