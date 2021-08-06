const { $ } = window;

export default function toggleList() {
  $(document).on('change', '.js-list-toggle', (evt) => {
    const toggle = evt.currentTarget;
    const toggleName = toggle.getAttribute('name');
    const lists = $(document).find(`[data-list-name="${toggleName}"]`);
    const listOn = $(lists).filter((i, el) => el.getAttribute('data-list-type') === 'on');
    const listOff = $(lists).filter((i, el) => el.getAttribute('data-list-type') === 'off');
    if (toggle.checked) {
      $(listOff).removeClass('is-active');
      $(listOn).addClass('is-active');
    } else {
      $(listOn).removeClass('is-active');
      $(listOff).addClass('is-active');
    }
  });
}
