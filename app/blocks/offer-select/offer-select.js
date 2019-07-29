const $ = window.$;

export default function offerSelect() {
  function OfferSelect(el) {
    this.el = $(el);
    this.label = $(this.el).find('[data-label]');
    this.head = $(this.el).find('[data-head]');
    this.inputs = $(this.el).find('[data-offer-input]');
    this.cross = $(this.el).find('[data-select-close]');

    this.init = function () {
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
    };
    this.getSelectedElem = function () {
      const t = this;
      const activeEl = $(t.el).find('[data-offer-input]:checked');
      const parent = $(activeEl).closest('[data-select-item]');
      const elem = $(parent).find('[data-select-value]');
      return elem;
    };
    this.preset = function () {
      const t = this;
      const currEl = t.getSelectedElem();
      $(t.label).empty();
      const cloneEl = $(currEl).clone();
      $(t.label).append(cloneEl);
    };
    this.open = function () {
      const t = this;
      $(t.el).addClass('is-open');
    };
    this.close = function () {
      const t = this;
      $(t.el).removeClass('is-open');
    };
    this.isOpen = function () {
      const t = this;
      return $(t.el).is('.is-open');
    };
    return this;
  }

  $('.js-offer-select').each((i, el) => {
    const select = new OfferSelect(el);
    select.init();
  });
}
