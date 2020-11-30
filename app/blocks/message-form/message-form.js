const { $ } = window;

export default function messageForm() {
  $(document).on('keydown', '.js-message', (evt) => {
    const key = evt.which;
    if (key === 13) {
      evt.preventDefault();
    }
  });
}
