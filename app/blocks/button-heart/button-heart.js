const { $ } = window;

export default function heartActivation() {
  $(document).on('click', '.js-heart', (evt) => {
    evt.preventDefault();
    $(evt.currentTarget).toggleClass('is-active');
  });
}
