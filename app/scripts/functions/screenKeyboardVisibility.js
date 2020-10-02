const $ = window.$;

export default function screenKeyboardVisibility() {
  function skv() {
    if (window.innerWidth < 768) {
      $('body').addClass('is-keyboard-visible');
    }
  }

  function skh() {
    if (window.innerWidth < 768) {
      $('body').removeClass('is-keyboard-visible');
    }
  }

  $(document).on('focus', 'input, textarea, [contenteditable]', skv);
  $(document).on('blur', 'input, textarea, [contenteditable]', skh);
}
