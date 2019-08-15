const $ = window.$;

export default class OfferSelect {
  constructor(el) {
    this.el = $(el);
    this.label = this.el.find('[data-label]');
    this.head = this.el.find('[data-head]');
    this.inputs = this.el.find('[data-offer-input]');
    this.cross = this.el.find('[data-select-close]');
    this.compensateWrap = $('.js-compensate-wrap');
    this.dropHeight = this.el.find('.offer-select__dropdown').outerHeight();
  }
  init() {
    const t = this;
    t.preset();
    $(document).on('click', t.head, (evt) => {
      const self = evt.target;
      if ($(self).is(t.head) || $(self).closest(t.head).length > 0) {
        if (t.isOpen()) {
          t.close();
        } else {
          t.open();
        }
      } else if (!($(self).is(t.el) || $(self).closest(t.el).length > 0)) {
        t.close();
      } else if ($(self).is(t.cross) || $(self).closest(t.cross).length > 0) {
        t.close();
      }
    });
    $(document).on('change', t.inputs, () => {
      t.preset();
      t.close();
    });
  }
  getSelectedElem() {
    const activeEl = this.el.find('[data-offer-input]:checked');
    const parent = activeEl.closest('[data-select-item]');
    const elem = parent.find('[data-select-value]');
    return elem;
  }
  preset() {
    const t = this;
    const currEl = t.getSelectedElem();
    t.label.empty();
    const cloneEl = $(currEl).clone();
    t.label.append(cloneEl);
  }
  compensateAllowed() {
    return this.compensateWrap.length && $(window).width() > window.globalOptions.sizes.md;
  }
  open() {
    this.el.addClass('is-open');

    if (this.compensateAllowed()) {
      this.compensateWrap.css('margin-bottom', this.dropHeight);
    }
  }
  close() {
    this.el.removeClass('is-open');

    if (this.compensateAllowed()) {
      this.compensateWrap.css('margin-bottom', 0);
    }
  }
  isOpen() {
    return this.el.is('.is-open');
  }
}
