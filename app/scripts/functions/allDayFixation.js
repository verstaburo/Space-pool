const { $ } = window;

export default function allDayFixation() {
  const accessCheck = $('.js-allday-fix input');

  function accessListener(el) {
    const container = $('[data-allday-container]');
    const startTime = $('[data-allday-from]');
    const endTime = $('[data-allday-till]');

    if ($(el).prop('checked') === true) {
      startTime[0].choices.setChoiceByValue('00:00');
      startTime.trigger('change');
      endTime[0].choices.setChoiceByValue('24:00');
      endTime.trigger('change');
      container.addClass('is-not-allowed');
    } else {
      container.removeClass('is-not-allowed');
    }
  }

  if (accessCheck.length) {
    accessListener(accessCheck);
  }

  $(document).on('change', '.js-allday-fix input', (evt) => {
    const _this = evt.currentTarget;
    accessListener(_this);
  });
}
