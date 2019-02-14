/* eslint-disable max-len */
const $ = window.$;

export default function calendar() {
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
    dp.view = 'days';
  });

  /*
  $(document).on('click', '[data-calendar-year]', (evt) => {
    const self = evt.target;
    const calendarBlock = $(self).closest('[data-calendar]');
    const dpLink = $(calendarBlock).find('.js-days-calendar');
    const dp = $(dpLink).datepicker().data('datepicker');
    dp.view = 'years';
  });

  $(document).on('click', '.datepicker--cell-year', (evt) => {
    evt.preventDefault();
    evt.stopPropagation();

    const self = evt.target;
    const calendarBlock = $(self).closest('[data-calendar]');
    const calendarYear = $(calendarBlock).find('[data-calendar-year]');
    const dpLink = $(calendarBlock).find('.js-days-calendar');
    const dp = $(dpLink).datepicker().data('datepicker');
    const cell = $(self).closest('.datepicker--cell-year');
    const year = parseInt($(cell).attr('data-year'), 10);
    const monthBlock = $('[data-calendar-month].is-active');
    const month = monthBlock.length > 0 ? parseInt($(monthBlock).attr('data-calendar-month'), 10) : 0;
    const date = new Date(year, month);
    const decade = dp.curDecade;
    if (!$(cell).is('.-other-decade-')) {
      dp.date = date;
      dp.view = 'days';
    } else if (year < decade[0]) {
      dp.prev();
    } else {
      dp.next();
    }
    $(calendarYear).text(year);
  });
  */
}
/* eslint-enable max-len */
