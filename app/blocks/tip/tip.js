const $ = window.$;

export default function tip() {
  // close tip
  $(document).on('click', '.js-close-tip', (evt) => {
    evt.preventDefault();
    const self = $(evt.target).closest('.tip');
    $(self).fadeOut();
  });
}
