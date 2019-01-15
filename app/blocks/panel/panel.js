import isTouchDevice from 'is-touch-device';

const $ = window.$;

export default function openPanel() {
  const bp = window.globalOptions.sizes;
  const panel = {
    open() {
      const panelEl = $('.panel');
      const toggle = $(panelEl).find('.js-panel-toggle');
      const openedName = $(toggle).attr('data-opened-name');
      $(panelEl).addClass('is-open');
      $(toggle).find('.button__text').text(openedName);
    },
    close() {
      const panelEl = $('.panel');
      const toggle = $(panelEl).find('.js-panel-toggle');
      const closedName = $(toggle).attr('data-closed-name');
      $(panelEl).removeClass('is-open');
      $(toggle).find('.button__text').text(closedName);
      window.closeOfferItems();
    },
    isOpen() {
      return $('.panel').is('.is-open');
    },
  };

  $(window).on('resize', () => {
    if ($(window).width() >= bp.lg) {
      panel.close();
    }
  });

  $(document).on('click', '.js-open-panel', (evt) => {
    evt.preventDefault();
    if (!isTouchDevice()) {
      if (panel.isOpen()) {
        panel.close();
      } else {
        panel.open();
      }
    }
  });

  $(document).on('touchstart', '.js-open-panel', () => {
    if (isTouchDevice()) {
      if (panel.isOpen()) {
        panel.close();
      } else {
        panel.open();
      }
    }
  });
}
