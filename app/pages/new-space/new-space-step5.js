const $ = window.$;

export default () => {
  const accessCheck = $('input[name="access"]');

  if (!accessCheck.length) return;

  const startTime = $('select[name="workTimeFrom"]');
  const endTime = $('select[name="workTimeTill"]');

  const accessListener = () => {
    if (accessCheck.prop('checked') === true) {
      startTime[0].choices.setChoiceByValue('0:00').disable();
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
