const { $ } = window;

export default function toggleFavorite() {
  $(document).on('click', '.js-toggle-favorite', (evt) => {
    evt.preventDefault();
    $(evt.currentTarget).toggleClass('is-active');
  });
}
