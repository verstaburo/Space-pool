/* eslint-disable max-len */
const { $ } = window;

// скрипт самого календаря находиться в app/blocks/form-elements/form-elements.js

export default function calendar() {
  function setCurrentDate() {
    const currDate = new Date();
    const currYear = currDate.getFullYear();
    const currMonth = currDate.getMonth();
    const calendars = $('[data-calendar]');
    $(calendars).each((i, el) => {
      const self = el;
      const yearBlock = $(self).find('[data-calendar-year]');
      const monthBlocks = $(self).find('[data-calendar-month]');
      const monthBlock = $(self).find(`[data-calendar-month="${currMonth}"]`);
      const dpLink = $(self).find('.js-days-calendar');
      const dp = $(dpLink).datepicker().data('datepicker');
      yearBlock[0].choices.setChoiceByValue(`${currYear}`);
      $(monthBlocks).removeClass('is-active');
      $(monthBlock).addClass('is-active');
      dp.date = currDate;
    });
  }

  setCurrentDate();
  window.setCurrentDateInPopup = setCurrentDate;

  function chooseMonth(el) {
    const self = el;
    const calendarBlock = $(self).closest('[data-calendar]');
    const dpLink = $(calendarBlock).find('.js-days-calendar');
    const dp = $(dpLink).datepicker().data('datepicker');
    const otherMonths = $(calendarBlock).find('[data-calendar-month]').not(self);
    const month = parseInt($(self).attr('data-calendar-month'), 10);
    const yearBlock = $(calendarBlock).find('[data-calendar-year]');
    const year = parseInt($(yearBlock).val(), 10);
    $(otherMonths).removeClass('is-active');
    $(self).addClass('is-active');
    const date = new Date(year, month);
    dp.date = date;
  }

  window.chooseMonth = chooseMonth;

  $(document).on('click', '[data-calendar-month]', (evt) => {
    evt.preventDefault();
    const self = evt.target;
    const calendarBlock = $(self).closest('[data-calendar]');
    const dpLink = $(calendarBlock).find('.js-days-calendar');
    const dp = $(dpLink).datepicker().data('datepicker');
    const otherMonths = $(calendarBlock).find('[data-calendar-month]').not(self);
    const month = parseInt($(self).attr('data-calendar-month'), 10);
    const yearBlock = $(calendarBlock).find('[data-calendar-year]');
    const year = parseInt($(yearBlock).val(), 10);
    $(otherMonths).removeClass('is-active');
    $(self).addClass('is-active');
    const date = new Date(year, month);
    dp.date = date;
  });

  $(document).on('change', '[data-calendar-year]', (evt) => {
    const self = evt.target;
    const calendarBlock = $(self).closest('[data-calendar]');
    const dpLink = $(calendarBlock).find('.js-days-calendar');
    const dp = $(dpLink).datepicker().data('datepicker');
    const year = parseInt($(self).val(), 10);
    const monthBlock = $('[data-calendar-month].is-active');
    const month = monthBlock.length > 0 ? parseInt($(monthBlock).attr('data-calendar-month'), 10) : 0;
    const date = new Date(year, month);
    dp.date = date;
  });

  $(document).on('click', '.js-switch-record-step', (evt) => {
    evt.preventDefault();
    const self = $(evt.target).is('.js-switch-record-step') ? $(evt.target) : $(evt.target).closest('.js-switch-record-step');
    const targetBlockId = $(self).attr('data-record-step-target');
    const blocks = $('[data-record-step]');
    const targetBlock = $(`[data-record-step="${targetBlockId}"]`);
    console.log(targetBlock);
    $(blocks).removeClass('is-active');
    $(targetBlock).addClass('is-active');
  });
}
/* eslint-enable max-len */
