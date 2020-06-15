/* eslint-disable class-methods-use-this */
/* eslint-disable no-plusplus */

// import Swiper from 'swiper';
import moment from 'moment';

const $ = window.$;

/**
 * Creates new Datepicker
 * @class
 * @param {string, HTMLElement} el - target object for generation calendar
 * @param {object} opts - start option for calendar
 * @param {string} opts.disabled - disabled calendar  string,
 *  sample '2020-07-08,2020-06-20,2020-07-01'
 * @param {string, HTMLElement} opts.resultField
 * @param {string} opts.resultFormat
 * @param {string, HTMLElement} opts.alternativeField
 * @param {string} opts.alternativeFormat
 * @param {string} opts.startDate
 * @param {string} opts.minDate
 * @param {string} opts.maxDate
 * @param {string} opts.viewType - 'vertical-scroll'
 */

export default class DatePicker {
  constructor(el, opts) {
    this.el = $(el);
    this.container = $(el).find('[data-dates-container]');
    this.input = opts.resultField ? $(opts.resultField) : $(el).find('input[data-dates-result]');
    this.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    this.daysShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    this.daysMin = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    this.alternativeFormat = opts.alternativeFormat !== undefined ? opts.alternativeFormat : 'DD-MM-YYYY';
    this.alternativeField = opts.alternativeField !== undefined ? $(opts.alternativeField) : $(el).find('[data-dates-alternative-result]');
    this.disabledDates = opts.disabled || '';
    this.startDate = opts.startDate !== undefined ? moment(opts.startDate) : moment();
    this.minDate = opts.minDate !== undefined ? moment(opts.midDate) : moment([1900, 0, 1]);
    this.maxDate = opts.maxDate !== undefined ? moment(opts.maxDate) : moment([3000, 0, 1]);
    this.resultFormat = opts.resultFormat || 'DD-MM-YYYY';
    this.firstDay = 1;
    this.viewType = opts.viewType || 'vertical-scroll';
    this._template = {
      sliderBase: '<div class="dates swiper-container"><div class="dates__wrapper swiper-wrapper"></div></div>',
      slideElem: '<div class="dates-table swiper-slide"><div class="dates-table__head"><div class="dates-table__title"></div><div class="dates-table__days"></div></div><div class="dates-table__body"></div></div>',
    };
    this.weekends = [6, 0];
  }

  init() {
    const t = this;
    t._createStructure();
    t._render();
    t._bindEvents();
  }

  _bindEvents() {
    const t = this;
    $(t.container).find('.dates__cell').on('click', $.proxy(t._onClickCell, t));
  }

  _getFormattedDate(date, mask) {
    const t = this;
    const view = mask || t.resultFormat;
    return moment(date).format(view);
  }

  _getDisabledDates() {
    const t = this;
    const disabledStringArray = t.disabledDates.split(',');
    const disabledDatesArray = [];
    $(disabledStringArray).each((i, el) => {
      disabledStringArray.push(moment(el));
    });
    return disabledDatesArray;
  }

  _createStructure() {
    const t = this;
    const container = t.container;
    $(t.container).empty();
    $(container).append(t._template.sliderBase);
  }

  _getSliderOptions() {
    const t = this;
    let options = {};
    if (t.viewType === 'vertical-scroll') {
      options = {
        direction: 'vertical',
        watchOverflow: true,
        slidesPerView: 'auto',
        observer: true,
        observeParents: true,
        on: {
          slideNextTransitionStart: t._generateNext().bind(t),
          slidePrevTransitionStart: t._generatePrev().bind(t),
        },
      };
    }
    if (t.viewType === 'horizontal-scroll') {
      options = {
        watchOverflow: true,
        slidesPerView: 'auto',
        observer: true,
        observeParents: true,
        on: {
          slideNextTransitionStart: t._generateNext().bind(t),
          slidePrevTransitionStart: t._generatePrev().bind(t),
        },
      };
    }
    return options;
  }

  _isWeekend(day) {
    const t = this;
    return t.weekends.indexOf(day) !== -1;
  }

  _generateDayNamesStructure(firstDay, curDay, html, i) {
    const t = this;
    let currentDay = curDay !== undefined ? curDay : firstDay;
    let template = html || '';
    let index = i !== undefined ? i : 0;

    if (i > 7) return template;
    if (currentDay === 7) return t._generateDayNamesStructure(firstDay, 0, template, ++index);
    template += `<div class="dates-table__cell dates-table__cell_name ${t._isWeekend(currentDay) ? 'dates-table__cell_weekend' : ''}">${t.daysMin[currentDay]}</div>`;
    return t._generateDayNamesStructure(firstDay, ++currentDay, template, ++index);
  }

  _generateCellContent(date) {
    const t = this;
    let cls = 'dates-table__cell dates-table__cell_day';
    const currentDate = moment();
    const d = moment.isMoment(date) ? date : moment(date);
    const html = d.date();
    const disabled = t._getDisabledDates();

    if (t._isWeekend(d.day())) {
      cls += ' dates-table__cell_weekend';
    }

    if (d.month() !== t.date.month()) {
      cls += ' dates-table__cell_other-month dates-table__cell_disabled';
    }

    if ($(disabled).filter((i, el) => el.isSame(d, 'day')).length > 0) {
      cls += ' dates-table__cell_disabled';
    }

    if (d.isSame(currentDate, 'day')) {
      cls += ' dates-table__cell_current';
    }

    if (d.isSame(t.selectedDate, 'day')) {
      cls += ' dates-table__cell_selected';
    }

    if (d.isBetween(t.minDate, t.maxDate)) {
      cls += ' dates-table__cell_disabled';
    }

    return {
      html,
      cls,
    };
  }

  _generateDayHtml(date) {
    const t = this;
    const content = t._generateCellContent(date);

    return `<div class="${content.cls}" data-dates-date="${moment(date).format(t.resultFormat)}">${content.html}</div>`;
  }

  _generateDaysStructure(date) {
    const t = this;
    const d = moment.isMoment(date) ? date : moment(date);
    const year = d.year();
    const month = d.month();
    const totalMonthDays = d.endOf('month').date();
    const firstMonthDay = moment([year, month, 1]).day();
    const lastMonthDay = moment([year, month, totalMonthDays]).day();
    let daysFromPrevMonth = firstMonthDay - t.firstDay;
    let daysFromNextMonth = (6 - lastMonthDay) + t.firstDay;

    daysFromPrevMonth = daysFromPrevMonth < 0 ? daysFromPrevMonth + 7 : daysFromPrevMonth;
    daysFromNextMonth = daysFromNextMonth > 6 ? daysFromNextMonth - 7 : daysFromNextMonth;

    const startDayIndex = 1 - daysFromPrevMonth;
    const max = totalMonthDays + daysFromNextMonth;
    let html = '';

    for (let i = startDayIndex; i <= max; i++) {
      html += t._generateDayHtml(new Date(year, month, i));
    }

    return html;
  }

  _generateMonthStructure(date) {
    const t = this;
    const month = moment.isMoment(date) ? date.month() : moment(date).month();
    return `<div class="dates-table__month">${t.months[month]}</div>`;
  }

  _generateYearStructure(date) {
    const year = moment.isMoment(date) ? date.year() : moment(date).year();
    return `<div class="dates-table__year">${year}</div>`;
  }

  _renderSlideItem(date) {
    const t = this;
    const d = moment.isMoment(date) ? date : moment(date);
    const dayNames = t._generateDayNamesStructure(t.firstDay);
    const days = t._generateDaysStructure(date);
    const month = t._generateMonthStructure(date);
    const year = t._generateYearStructure(date);
    const slide = $(t._template.slideElem);
    $(slide).attr('data-dates-month', `${moment([d.year(), d.month(), 1]).format('YYYY-MM-DD')}`);
    $(slide).find('.dates-table__title').append(`${month} ${year}`);
    $(slide).find('.dates-table__days').append(dayNames);
    $(slide).find('.dates-table__body').append(days);
    return slide;
  }

  _render() {
    const t = this;
    const baseDate = t.startDate;
    t.date = baseDate;
    t.selectedDate = t.startDate;
    const year = baseDate.year();
    const month = baseDate.month();
    const startDate = month - 4;
    const endDate = month + 4;
    t.lastGenSlide = moment(new Date(year, endDate, 1));
    t.firstGenSlide = moment(new Date(year, startDate, 1));
    for (let i = startDate; i <= endDate; i++) {
      $(t.container).find('.dates__wrapper').append(t._renderSlideItem(moment(new Date(year, i, 1))));
    }
  }
}
/* eslint-enable no-plusplus */
