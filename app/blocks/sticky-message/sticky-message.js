const $ = window.$;

export default function stickyMessage() {
  $(document).on('click', '.js-close-message', (evt) => {
    evt.preventDefault();
    const self = evt.target;
    const message = $(self).closest('[data-sticky-message]');
    $(message).fadeOut(300);
  });
}
