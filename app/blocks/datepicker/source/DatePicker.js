import Swiper from 'swiper';

const $ = window.$;

export default class Datepicker {
  constructor(el, opts) {
    this.el = $(el);
    this.container = $(opts.container);
    this.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    this.daysShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    this.daysMin = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    this.dateFormat = 'mm/dd/yyyy';
    this.firstDay = 1;
  }

  static _daysInMonth(month, year) {
    return 32 - new Date(year, month, 32).getDate();
  }
}
