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
    const {
      options,
    } = _this;

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
    const {
      dates,
    } = _this.options;
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
    // eslint-disable-next-line prefer-destructuring
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
    const {
      colors,
    } = _this.options;
    const {
      labels,
    } = _this.options;
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
    // const markerOuter = document.createElementNS(ns, 'circle');
    markerGroup.classList.add('donut__today');
    markerInner.setAttributeNS(null, 'cx', cx);
    markerInner.setAttributeNS(null, 'cy', cy);
    markerInner.setAttributeNS(null, 'r', 7);
    markerInner.setAttributeNS(null, 'fill', color);
    markerInner.setAttributeNS(null, 'stroke', 'white');
    markerGroup.classList.add('donut__today');
    // markerOuter.setAttributeNS(null, 'cx', cx);
    // markerOuter.setAttributeNS(null, 'cy', cy);
    // markerOuter.setAttributeNS(null, 'r', 6.5);
    // markerOuter.setAttributeNS(null, 'fill', 'none');
    // markerOuter.setAttributeNS(null, 'stroke', 'white');
    // markerGroup.append(markerOuter);
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
    donut.setAttributeNS(null, 'viewBox', '0 0 142 142');
    const ring = document.createElementNS(ns, 'circle');
    ring.classList.add('donut__ring');
    ring.setAttributeNS(null, 'cx', 71);
    ring.setAttributeNS(null, 'cy', 71);
    ring.setAttributeNS(null, 'r', 66.5);
    ring.setAttributeNS(null, 'fill', 'transparent');
    ring.setAttributeNS(null, 'stroke-width', 7);
    ring.setAttributeNS(null, 'stroke', _this.options.colors.base);
    donut.append(ring);
    return donut;
  }

  _createBaseDonutSegment(dash, offset, width, color) {
    const ns = 'http://www.w3.org/2000/svg';
    const segment = document.createElementNS(ns, 'circle');
    segment.classList.add('donut__segment');
    segment.setAttributeNS(null, 'cx', 71);
    segment.setAttributeNS(null, 'cy', 71);
    segment.setAttributeNS(null, 'r', 66.5);
    segment.setAttributeNS(null, 'fill', 'transparent');
    segment.setAttributeNS(null, 'stroke-width', width);
    segment.setAttributeNS(null, 'stroke', color);
    segment.setAttributeNS(null, 'stroke-dashoffset', offset);
    segment.setAttributeNS(null, 'stroke-dasharray', dash);
    return segment;
  }

  _createDonutLabels(label, color) {
    const lbl = document.createElement('div');
    lbl.classList.add('chart__label');
    lbl.innerHTML = `<span class="chart__marker" style="background-color: ${color}"></span> <span class="chart__label-text">${label}<span>`;
    return lbl;
  }

  _getRemainings() {
    const _this = this;
    const {
      dates,
    } = _this.options;
    const startDate = moment(dates.startDate);
    const endDate = moment(dates.endDate);
    const today = moment();
    const type = _this.options.remainFormat;
    const fullPeriod = endDate.diff(startDate, type);
    const progressPeriod = today.diff(startDate, type);
    const remainingPeriod = fullPeriod - progressPeriod;
    return {
      total: fullPeriod,
      current: progressPeriod,
      remain: remainingPeriod,
    };
  }

  _fillStatisticFields() {
    const _this = this;
    const type = _this.options.remainFormat;
    let typeName = ['month', 'months'];
    if (type === 'days') {
      typeName = ['day', 'days'];
    } else if (type === 'years') {
      typeName = ['year', 'years'];
    } else if (type === 'weeks') {
      typeName = ['week', 'weeks'];
    }
    const periods = _this._getRemainings();
    const remainings = `${periods.remain} ${(periods.remain > 1 ? typeName[1] : typeName[0])}`;
    _this.elRemainingPeriod.innerText = remainings;
    _this.elProgressCounter.innerText = `${periods.current}`;
    _this.elTotalCounter.innerText = ` / ${periods.total}`;
    // eslint-disable-next-line prefer-destructuring
    _this.elRemainUnits.innerText = typeName[1];
  }

  _createDonutDiagram() {
    const _this = this;
    const data = _this._getValues();
    const {
      colors,
    } = _this.options;
    const {
      labels,
    } = _this.options;
    const el = _this._createBaseDonutHTML();
    Object.keys(data).forEach((key) => {
      const strokeWidth = (key === 'progress' || key === 'overlay') ? 9 : 7;
      const cL = 417.83182; // circumference
      let segmentOffset = cL * 0.25;
      switch (key) {
        case ('progress'): {
          segmentOffset = cL * 0.25;
          break;
        }
        case ('base'): {
          segmentOffset = (cL * 1.25) - (cL * (data.progress / 100));
          break;
        }
        case ('overlay'): {
          segmentOffset = (cL * 1.25) - ((data.progress / 100) * cL);
          break;
        }
        case ('notice'): {
          segmentOffset = (cL * 1.25) - (((data.base + data.progress + data.overlay) / 100) * cL);
          break;
        }
        default:
          break;
      }
      if (key !== 'base') {
        const segment = _this._createBaseDonutSegment(`${cL * (data[key] / 100)} ${cL - (cL * (data[key] / 100))}`, segmentOffset, strokeWidth, colors[key]);
        segment.classList.add(`is-${key}`);
        el.append(segment);
      }
    });
    const allprogress = data.progress + data.overlay;
    const angle = (2 * Math.PI * (allprogress / 100)) - (0.5 * Math.PI);
    const cx = 71 + (66.5 * Math.cos(angle));
    const cy = 71 + (66.5 * Math.sin(angle));
    const marker = _this._createTodayMarker(cx, cy, colors.progress);
    el.append(marker);
    _this.elContainer.append(el);
    if (_this.elLabels) {
      Object.keys(labels).forEach((key) => {
        if (key === 'overlay' && data.overlay > 0) {
          const label = _this._createDonutLabels(labels[key], colors[key]);
          _this.elLabels.append(label);
        }
        if (key !== 'overlay') {
          const label = _this._createDonutLabels(labels[key], colors[key]);
          _this.elLabels.append(label);
        }
      });
    }
    _this._fillStatisticFields();
  }
}
/* eslint-enable class-methods-use-this */
