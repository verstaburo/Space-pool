const $ = window.$;

export default () => {
  const accessCheck = $('.js-access-toggle input');

  if (!accessCheck.length) return;

  const startTime = $('.js-access-from');
  const endTime = $('.js-access-till');

  const accessListener = () => {
    if (accessCheck.prop('checked') === true) {
      startTime[0].choices.setChoiceByValue('00:00').disable();
      startTime.trigger('change');
      endTime[0].choices.setChoiceByValue('24:00').disable();
      endTime.trigger('change');
    } else {
      startTime[0].choices.enable();
      endTime[0].choices.enable();
    }
  };

  accessListener();
  accessCheck.on('change', accessListener);
};
