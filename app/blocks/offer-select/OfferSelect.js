import isTouchDevice from 'is-touch-device';

const {
  $,
} = window;

export default class OfferSelect {
  constructor(el) {
    this.el = $(el);
    this.label = this.el.find('[data-label]');
    this.head = this.el.find('[data-head]');
    this.inputs = this.el.find('[data-offer-input]');
    this.links = this.el.find('[data-offer-link]');
    this.cross = this.el.find('[data-select-close]');
    this.compensateWrap = $('.js-compensate-wrap');
    this.dropdown = this.el.find('.offer-select__dropdown');
    this.init = this.init.bind(this);
  }

  init() {
    const t = this;
    if (t.links.length <= 0) {
      t.preset();
    } else {
      t.linkPreset();
    }

    $(t.head).on('click', () => {
      if (!isTouchDevice()) {
        if (t.isOpen()) {
          t.close();
        } else {
          t.open();
        }
      }
    });

    $(t.head).on('touchstart', (evt) => {
      evt.preventDefault();
      if (isTouchDevice()) {
        if (t.isOpen()) {
          t.close();
        } else {
          t.open();
        }
      }
    });

    $(t.cross).on('click', () => {
      t.close();
    });

    $(t.inputs).on('click', () => {
      t.preset();
      t.close();
    });

    $(t.inputs).on('change', () => {
      t.preset();
      t.close();
    });

    $(document).on('click', (evt) => {
      const self = evt.target;
      if (!($(self).is(t.el) || $(self).closest(t.el).length > 0)) {
        t.close();
      }
    });

    $(window).on('resize', () => {
      if (t.links.length <= 0) {
        t.preset();
      } else {
        t.linkPreset();
      }
      t.close();
    });

    $(t.links).on('click', (evt) => {
      const link = evt.currentTarget;
      if ($(link).is((i, el) => $(el).is(link))) {
        t.linkPreset(link);
        t.close();
      }
    });
  }

  getSelectedElem() {
    const activeEl = this.el.find('[data-offer-input]:checked');
    const parent = activeEl.closest('[data-select-item]');
    const elem = parent.find('[data-select-value]');
    return elem;
  }

  getSelectedLink() {
    const activeEl = this.el.find('[data-offer-link].is-select');
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

  linkPreset(newEl) {
    const t = this;
    const currEl = t.getSelectedLink();
    if (newEl) {
      $(t.links).removeClass('is-select');
      $(newEl).addClass('is-select');
      t.label.empty();
      const newSelectedValue = $(newEl).is('[data-select-value]') ? newEl : $(newEl).find('[data-select-value]');
      const cloneEl = $(newSelectedValue).clone();
      t.label.append(cloneEl);
    } else {
      t.label.empty();
      const cloneEl = $(currEl).clone();
      t.label.append(cloneEl);
    }
  }

  compensateAllowed() {
    return this.compensateWrap.length && $(window).width() > window.globalOptions.sizes.md;
  }

  open() {
    this.el.addClass('is-open');

    if (this.compensateAllowed()) {
      const dropHeight = $(this.dropdown).outerHeight() + 40;
      this.compensateWrap.css('margin-bottom', `${dropHeight}px`);
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
