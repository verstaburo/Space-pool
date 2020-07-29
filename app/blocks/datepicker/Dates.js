/* eslint-disable class-methods-use-this */
/* eslint-disable no-plusplus */

// http://idangero.us/swiper/#.WcIu5oy0OHs
import * as Swiper from 'swiper/js/swiper';
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
    this.autoactivate = opts.autoactivate || false;
    this.input = opts.resultField ? $(opts.resultField) : $(el).find('input[data-dates-result]');
    this.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    this.daysShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    this.daysMin = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    this.alternativeFormat = opts.alternativeFormat !== undefined ? opts.alternativeFormat : 'D MMMM YYYY';
    this.alternativeField = opts.alternativeField !== undefined ? $(opts.alternativeField) : $(el).find('[data-dates-alternative-result]');
    this.disabledDates = opts.disabledDates || '';
    this.startDate = opts.startDate !== undefined ? moment(opts.startDate) : moment();
    this.minDate = opts.minDate !== undefined ? moment(opts.midDate) : moment([1900, 0, 1]);
    this.maxDate = opts.maxDate !== undefined ? moment(opts.maxDate) : moment([3000, 0, 1]);
    this.resultFormat = opts.resultFormat || 'YYYY-MM-DD';
    this.firstDay = 1;
    this.viewType = opts.viewType || 'vertical';
    this._template = {
      sliderBase: '<div class="dates swiper-container"><div class="dates__wrapper swiper-wrapper"></div><div class="dates__navigation"><div class="dates__buttons"><div class="dates__button dates__button_prev"><svg width="7" height="16" viewBox="0 0 7 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.14453 1.41016L1.14453 8.05415" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/><path d="M1.14453 8.05469L6.14453 14.6987" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/></svg></div><div class="dates__button dates__button_next"><svg width="7" height="16" viewBox="0 0 7 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.857422 1.41016L5.81859 8.00255" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/><path d="M5.81859 8.00391L0.857422 14.5963" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/></svg></div></div><div class="dates__scrollbar"></div></div></div>',
      slideElem: '<div class="dates-table swiper-slide"><div class="dates-table__head"><div class="dates-table__title"></div><div class="dates-table__days"></div></div><div class="dates-table__body"></div></div>',
    };
    this.weekends = [6, 0];
    this._generateNewSlide = this._generateNewSlide.bind(this);
    this._hideDates = this._hideDates.bind(this);
    this._showDates = this._showDates.bind(this);
  }

  init() {
    const t = this;
    t._createStructure();
    t._render();
    t._sliderInit();
    t._setSelectedDateInFieldsOnInit();
    t._bindEvents();
    if (t.autoactivate) {
      t._showDates();
    }
  }

  _bindEvents() {
    const t = this;
    if (t.autoactivate) {
      $(t.input).on('focus', $.proxy(t._showDates, t));
      $(document).on('click', $.proxy(t._hideDates, t));
    }
    $(t.container).on('click', '.dates-table__cell', $.proxy(t._onClickCell, t));
    $(t.container).on('click', (evt) => {
      evt.preventDefault();
      evt.stopPropagation();
    });
  }

  _getDisabledDates() {
    const t = this;
    const disabledDatesArray = [];
    if (t.disabledDates.length > 0) {
      const disabledStringArray = t.disabledDates.split(',');
      $(disabledStringArray).each((i, el) => {
        disabledDatesArray.push(moment(el));
      });
    }
    return disabledDatesArray;
  }

  _createStructure() {
    const t = this;
    const container = t.container;
    $(t.container).empty();
    $(container).append(t._template.sliderBase);
    t.slider = $(t.container).find('.dates')[0];

    if (t.autoactivate) {
      $(t.slider).addClass('dates_drop');
    }
  }

  _getSliderOptions(index) {
    const t = this;
    let options = {};
    const initialSlide = index || 0;
    const btnPrev = $(t.container).find('.dates__button_prev')[0];
    const btnNext = $(t.container).find('.dates__button_next')[0];
    switch (t.viewType) {
      case 'vertical': {
        options = {
          direction: 'vertical',
          initialSlide,
          watchOverflow: true,
          slidesPerView: 'auto',
          observer: true,
          observeParents: true,
          observeSlideChildren: true,
          mouseweel: true,
          runCallbacksOnInit: false,
          navigation: {
            nextEl: btnNext,
            prevEl: btnPrev,
          },
          on: {
            slideChangeTransitionEnd: t._generateNewSlide,
          },
        };
        break;
      }
      case 'horizontal': {
        options = {
          watchOverflow: true,
          slidesPerView: 1,
          spaceBetween: 80,
          initialSlide,
          observer: true,
          observeParents: true,
          observeSlideChildren: true,
          runCallbacksOnInit: true,
          autoHeight: true,
          navigation: {
            nextEl: btnNext,
            prevEl: btnPrev,
          },
          on: {
            slideChangeTransitionEnd: t._generateNewSlide,
          },
          breakpoints: {
            300: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
          },
        };
        break;
      }
      default:
        break;
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
    template += `<div class="dates-table__cell dates-table__cell_name ${t._isWeekend(currentDay) ? 'dates-table__cell_weekend' : ''}"><span>${t.daysMin[currentDay]}</span></div>`;
    return t._generateDayNamesStructure(firstDay, ++currentDay, template, ++index);
  }

  _generateCellContent(date) {
    const t = this;
    let cls = 'dates-table__cell dates-table__cell_day';
    const currentDate = moment();
    const d = moment.isMoment(date) ? date : moment(date);
    const html = `<span>${d.date()}</span>`;
    const disabled = t._getDisabledDates();

    if (t._isWeekend(d.day())) {
      cls += ' dates-table__cell_weekend';
    }

    if (d.month() !== t.date.month()) {
      cls += ' dates-table__cell_other-month is-disabled';
    }

    if ($(disabled).filter((i, el) => el.isSame(d, 'day')).length > 0) {
      cls += ' is-disabled';
    }

    if (d.isSame(currentDate, 'day')) {
      cls += ' is-current';
    }

    if (d.isSame(t.selectedDate, 'day')) {
      cls += ' is-selected';
    }

    if (!d.isBetween(t.minDate, t.maxDate)) {
      cls += ' is-disabled';
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
    t.date = moment.isMoment(date) ? date : moment(date);
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
    const val = $(t.input).val();
    if (t.startDate) {
      t.selectedDate = t.startDate;
    }
    if (val) {
      t.selectedDate = moment(val);
    }
    const baseDate = t.selectedDate;
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

  _sliderInit() {
    const t = this;
    const d = t.selectedDate;
    let activeSlide = 0;
    const slides = $(t.container).find('[data-dates-month]');
    $(slides).each((i, el) => {
      if ($(el).attr('data-dates-month') === moment([d.year(), d.month(), 1]).format('YYYY-MM-DD')) {
        activeSlide = i;
      }
    });
    const slider = t.slider;
    const opts = t._getSliderOptions(activeSlide);
    const sw = new Swiper(slider, opts);
    t.sw = sw;
  }

  _generateNewSlide() {
    const t = this;
    const sw = t.slider.swiper;
    const activeIndex = sw.activeIndex;
    const prevIndex = sw.previousIndex;
    const lastSlide = sw.slides.length - 1;
    const direction = activeIndex - prevIndex;
    if (direction < 0 && activeIndex < 4) {
      const firstGenSlide = moment($(sw.slides[0]).attr('data-dates-month'));
      const newSlideDate = firstGenSlide.subtract(1, 'months');
      const newSlide = t._renderSlideItem(newSlideDate);
      sw.removeSlide(lastSlide);
      sw.prependSlide(newSlide);
    } else if (direction > 0 && (lastSlide - activeIndex) < 4) {
      const lastGenSlide = moment($(sw.slides[lastSlide]).attr('data-dates-month'));
      const newSlideDate = lastGenSlide.add(1, 'months');
      const newSlide = t._renderSlideItem(newSlideDate);
      sw.removeSlide(0);
      sw.appendSlide(newSlide);
    }
  }

  _onClickCell(evt) {
    const t = this;
    const self = evt.currentTarget;

    evt.preventDefault();

    if (!$(self).hasClass('is-disabled')) {
      t._handleClick.bind(this)(self);
    }
  }

  _handleClick(el) {
    const t = this;
    const date = moment($(el).attr('data-dates-date'));
    t.lastSelected = t.selectedDate;
    t.selectedDate = date;
    $(t.input).val(date.format(t.resultFormat));
    $(t.alternativeField).html(date.format(t.alternativeFormat));
    if (t.lastSelected !== undefined) {
      $(t.container).find(`[data-dates-date="${t.lastSelected.format(t.resultFormat)}"]`).removeClass('is-selected');
    }
    $(el).addClass('is-selected');
    $(t.input).trigger('change');
    if (t.autoactivate) {
      t._hideDates();
    }
  }

  _setSelectedDateInFieldsOnInit() {
    const t = this;
    const date = t.selectedDate;
    if (!$(t.input).val().length > 0) {
      $(t.input).val(date.format(t.resultFormat));
      $(t.alternativeField).html(date.format(t.alternativeFormat));
      $(t.input).trigger('change');
    }
  }

  _setSelectedDateInFieldsOnOpen() {
    const t = this;
    const date = t.selectedDate;
    if (!$(t.input).val().length > 0) {
      $(t.input).val(date.format(t.resultFormat));
      $(t.alternativeField).html(date.format(t.alternativeFormat));
    }
  }

  _showDates() {
    const t = this;
    const self = t.el;
    window.globalFunctions.itemPositioning(t.container);
    setTimeout(() => {
      $(self).addClass('is-active');
    }, 0);
  }

  _hideDates(evt) {
    const t = this;
    const self = t.el;
    if (evt) {
      const target = evt.target;
      if ($(target).closest('.dates').length === 0 && $(target).closest('.js-nd-datepicker').length === 0 && $(target).not('.js-nd-datepicker')) {
        $(self).removeClass('is-active');
      }
    } else {
      $(self).removeClass('is-active');
    }
  }
}
/* eslint-enable no-plusplus */
