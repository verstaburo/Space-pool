/* eslint-disable class-methods-use-this */
import moment from 'moment';

/**
 * Creates new Chart (type line or donut)
 * @class
 * @param {string, HTMLElement} el - target object for generation chart
 */

export default class Chart {
  constructor(el) {
    this.el = el;
    this.options = JSON.parse((el.getAttribute('data-chart-data')) || {});
    this.elContainer = el.querySelector('[data-chart-target]');
    this.elLabels = el.querySelector('[data-chart-labels]');
    this.elRemainingPeriod = el.querySelector('[data-chart-remaining-period]');
    this.elProgressCounter = el.querySelector('[data-chart-progress-counter]');
    this.elTotalCounter = el.querySelector('[data-chart-total-counter]');
    this.elRemainUnits = el.querySelector('[data-chart-remain-units]');
    this.init();
  }

  init() {
    const _this = this;
    const options = _this.options;

    if (Object.keys(options).length === 0) {
      if (_this.elContainer.length) {
        _this.elContainer.append('Error creating chart');
      }
    } else if (_this.options.type === 'donut') {
      _this._createDonutDiagram();
    } else {
      _this._createLineDiagram();
    }
  }

  _getValues() {
    const _this = this;
    const data = _this.options.dates;
    const now = moment();
    const startDate = moment(data.startDate);
    const endDate = moment(data.endDate);
    const noticeDate = moment(data.noticeDate);
    const fullTime = endDate.diff(startDate);
    let noticePeriod = endDate.diff(noticeDate);
    let basePeriod = noticeDate.diff(now);
    let progressPeriod = now.diff(startDate);
    let overlayPeriod = 0;
    if (basePeriod < 0) {
      basePeriod = 0;
      overlayPeriod = now.diff(noticeDate);
      noticePeriod = endDate.diff(now);
      progressPeriod = noticeDate.diff(startDate);
    }
    const noticePersentage = (100 * noticePeriod) / fullTime;
    const progressPersentage = (100 * progressPeriod) / fullTime;
    const overlayPersentage = (100 * overlayPeriod) / fullTime;
    const basePersentage = (100 * basePeriod) / fullTime;
    return {
      progress: progressPersentage,
      base: basePersentage,
      overlay: overlayPersentage,
      notice: noticePersentage,
    };
  }

  _getFormattedDates() {
    const _this = this;
    const dates = _this.options.dates;
    return {
      startDate: [moment(dates.startDate).format('DD MMM YYYY'), moment(dates.startDate).toISOString()],
      endDate: [moment(dates.endDate).format('DD MMM YYYY'), moment(dates.endDate).toISOString()],
      noticeDate: [moment(dates.noticeDate).format('DD MMM YYYY'), moment(dates.noticeDate).toISOString()],
      now: ['Today', moment().toISOString()],
    };
  }

  _generateLineLabelHtml(date, label) {
    const lbl = document.createElement('div');
    const labelDate = document.createElement('time');
    lbl.classList.add('line__label');
    labelDate.classList.add('line__label-date');
    labelDate.setAttribute('datetime', date[1]);
    labelDate.innerText = date[0];
    if (label) {
      const labelText = document.createElement('div');
      labelText.classList.add('line__label-text');
      labelText.innerText = label;
      lbl.append(labelText);
    }
    lbl.append(labelDate);
    return lbl;
  }

  _createLineDiagram() {
    const _this = this;
    const data = _this._getValues();
    const dates = _this._getFormattedDates();
    const colors = _this.options.colors;
    const labels = _this.options.labels;
    const el = document.createElement('div');
    el.classList.add('line');
    const startMarker = _this._generateLineLabelHtml(dates.startDate, labels.start);
    const endMarker = _this._generateLineLabelHtml(dates.endDate, labels.end);
    const noticeMarker = _this._generateLineLabelHtml(dates.noticeDate, labels.notice);
    const todayMarker = _this._generateLineLabelHtml(dates.now);
    startMarker.classList.add('line__label_start');
    endMarker.classList.add('line__label_end');
    noticeMarker.classList.add('line__label_notice');
    todayMarker.classList.add('line__label_today');
    Object.keys(data).forEach((key) => {
      const segment = document.createElement('div');
      segment.classList.add('line__segment', `is-${key}`);
      segment.style.setProperty('background-color', colors[key]);
      el.style.setProperty(`--line-${key}-persent`, `${data[key]}%`);
      if (key === 'notice') {
        segment.append(noticeMarker);
      }
      if (key === 'overlay') {
        segment.append(todayMarker);
      }
      el.append(segment);
    });
    el.append(startMarker);
    el.append(endMarker);
    _this.elContainer.append(el);
  }

  _createTodayMarker(cx, cy, color) {
    const ns = 'http://www.w3.org/2000/svg';
    const markerGroup = document.createElementNS(ns, 'g');
    const markerInner = document.createElementNS(ns, 'circle');
    const markerOuter = document.createElementNS(ns, 'circle');
    markerGroup.classList.add('donut__today');
    markerInner.setAttributeNS(null, 'cx', cx);
    markerInner.setAttributeNS(null, 'cy', cy);
    markerInner.setAttributeNS(null, 'r', 1.68);
    markerInner.setAttributeNS(null, 'fill', color);
    markerGroup.classList.add('donut__today');
    markerOuter.setAttributeNS(null, 'cx', cx);
    markerOuter.setAttributeNS(null, 'cy', cy);
    markerOuter.setAttributeNS(null, 'r', 1.56);
    markerOuter.setAttributeNS(null, 'fill', 'none');
    markerOuter.setAttributeNS(null, 'stroke', 'white');
    markerGroup.append(markerOuter);
    markerGroup.append(markerInner);
    return markerGroup;
  }

  _createBaseDonutHTML() {
    const ns = 'http://www.w3.org/2000/svg';
    const _this = this;
    const donut = document.createElementNS(ns, 'svg');
    donut.classList.add('donut');
    donut.setAttributeNS(null, 'width', '100%');
    donut.setAttributeNS(null, 'height', '100%');
    donut.setAttributeNS(null, 'viewBox', '0 0 40 40');
    const ring = document.createElementNS(ns, 'circle');
    ring.classList.add('donut__ring');
    ring.setAttributeNS(null, 'cx', 20);
    ring.setAttributeNS(null, 'cy', 20);
    ring.setAttributeNS(null, 'r', 15.91549430918954);
    ring.setAttributeNS(null, 'fill', 'transparent');
    ring.setAttributeNS(null, 'stroke-width', '1.67');
    ring.setAttributeNS(null, 'stroke', _this.options.colors.base);
    donut.append(ring);
    return donut;
  }

  _createBaseDonutSegment(dash, offset, width, color) {
    const ns = 'http://www.w3.org/2000/svg';
    const segment = document.createElementNS(ns, 'circle');
    segment.classList.add('donut__segment');
    segment.setAttributeNS(null, 'cx', 20);
    segment.setAttributeNS(null, 'cy', 20);
    segment.setAttributeNS(null, 'r', 15.91549430918954);
    segment.setAttributeNS(null, 'fill', 'transparent');
    segment.setAttributeNS(null, 'stroke-width', width);
    segment.setAttributeNS(null, 'stroke', color);
    segment.setAttributeNS(null, 'stroke-dashoffset', offset);
    segment.setAttributeNS(null, 'stroke-dasharray', dash);
    return segment;
  }

  _createDonutDiagram() {
    const _this = this;
    const data = _this._getValues();
    // const dates = _this.options.dates;
    const colors = _this.options.colors;
    // const labels = _this.options.labels;
    const el = _this._createBaseDonutHTML();
    Object.keys(data).forEach((key) => {
      const strokeWidth = (key === 'progress' || key === 'overlay') ? '2.15' : '1.67';
      let segmentOffset = 25;
      console.log(data);
      switch (key) {
        case ('progress'): {
          segmentOffset = 25;
          break;
        }
        case ('base'): {
          segmentOffset = 125 - data.progress;
          break;
        }
        case ('overlay'): {
          segmentOffset = 125 - data.progress;
          break;
        }
        case ('notice'): {
          segmentOffset = 125 - data.base - data.progress - data.overlay;
          break;
        }
        default:
          break;
      }
      if (key !== 'base') {
        const segment = _this._createBaseDonutSegment(`${data[key]} ${100 - data[key]}`, segmentOffset, strokeWidth, colors[key]);
        segment.classList.add(`is-${key}`);
        el.append(segment);
      }
    });
    const allprogress = data.progress + data.overlay;
    const angle = (2 * Math.PI * (allprogress / 100)) - (0.5 * Math.PI);
    const cx = 20 + (15.91549430918954 * Math.cos(angle));
    const cy = 20 + (15.91549430918954 * Math.sin(angle));
    const marker = _this._createTodayMarker(cx, cy, colors.progress);
    el.append(marker);
    _this.elContainer.append(el);
  }
}
/* eslint-enable class-methods-use-this */
