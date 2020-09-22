const $ = window.$;

export default () => {
  const accessCheck = $('.js-access-toggle input');

  function accessListener(el) {
    const startTime = $('.js-access-from');
    const endTime = $('.js-access-till');

    if ($(el).prop('checked') === true) {
      startTime[0].choices.setChoiceByValue('00:00').disable();
      startTime.trigger('change');
      endTime[0].choices.setChoiceByValue('24:00').disable();
      endTime.trigger('change');
    } else {
      startTime[0].choices.enable();
      endTime[0].choices.enable();
    }
  }

  if (accessCheck.length) {
    accessListener(accessCheck);
  }

  $(document).on('change', '.js-access-toggle input', (evt) => {
    const _this = evt.currentTarget;
    accessListener(_this);
  });
};
