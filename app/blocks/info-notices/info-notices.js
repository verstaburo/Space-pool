const $ = window.$;

export default function infoNoitces() {
  function Notices(el) {
    this.bp = window.globalOptions.sizes;
    this.src = el;
    this.target = $(`#${$(el).attr('href').split('#').pop()}`);
    this.cross = $(this.target).find('.js-close-notices');
    this.init = function () {
      const t = this;
      if (window.globalOptions.notices !== undefined) {
        window.globalOptions.notices.close();
      }
      window.globalOptions.notices = t;
      t.open();
      $(document).on('click', null, t, t.stalkClose);
      $(document).on('HEADER_SHORT_ON', 'body', () => {
        t.updatePosition(t);
      });
      $(document).on('HEADER_SHORT_OFF', 'body', () => {
        t.updatePosition(t);
      });
    };
    this.coordinates = function () {
      const t = this;
      const src = t.src;
      let result = {};
      if (window.Modernizr.mq(`(max-width: ${window.globalOptions.sizes.md - 1}px)`)) {
        result = {
          x: 0,
          y: 0,
        };
      } else {
        const srcC = src.getBoundingClientRect();
        const x = srcC.left + ((srcC.right - srcC.left) * 0.5);
        const y = srcC.bottom;
        result = {
          x,
          y,
        };
      }
      return result;
    };
    this.updatePosition = function (s) {
      const t = s;
      const coord = t.coordinates();
      $(t.target).css({
        top: `${coord.y}px`,
        left: `${coord.x}px`,
      });
    };
    this.open = function () {
      const t = this;
      const coord = t.coordinates();
      $(t.src).addClass('is-active');
      $(t.target).css({
        top: `${coord.y}px`,
        left: `${coord.x}px`,
      });
      setTimeout(() => {
        $(t.target).addClass('is-opened');
      }, 50);
    };
    this.close = function () {
      const t = this;
      $(t.src).removeClass('is-active');
      $(t.target).removeClass('is-opened');
      window.globalOptions.notices = undefined;
      $(document).off('click', t.stalkClose);
    };
    this.stalkClose = function (evt) {
      const t = evt.data;
      const self = evt.target;
      if ($(self).is(t.cross) || $(self).closest(t.cross).length > 0) {
        t.close();
      }
      if (!($(self).is(t.target) || $(self).closest(t.target).length > 0)) {
        t.close();
      }
    };
    return this;
  }

  $(document).on('click', '.js-show-notices', (evt) => {
    evt.preventDefault();
    const self = evt.currentTarget;
    if ($(self).hasClass('is-active')) {
      window.globalOptions.notices.close();
    } else {
      const notice = new Notices(self);
      notice.init();
    }
  });
}
