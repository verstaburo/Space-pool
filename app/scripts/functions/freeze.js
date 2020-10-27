// Скрипт "замораживает" страничку, запрещая скролл
const $ = window.$;

export function freeze() {
  const h = $('html');

  h.addClass('freeze');

  if (h.css('position') !== 'fixed') {
    const top = h.scrollTop() ? h.scrollTop() : $('body').scrollTop();

    if (window.innerHeight < h.height()) {
      $('body').css({
        'overflow-y': 'scroll',
      });
    }

    h.css({
      width: '100%',
      height: '100%',
      position: 'fixed',
      top: -top,
      'touch-action': 'none',
    });

    $('body').addClass('is-freeze-window');
    $(document.body).trigger('sticky_kit:recalc');
  }
}

export function unfreeze() {
  const h = $('html');

  h.removeClass('freeze');

  if (h.css('position') === 'fixed') {
    h.css('position', 'static');

    $('html, body').scrollTop(-parseInt(h.css('top'), 10));
    h.css({
      position: '',
      width: '',
      height: '',
      top: '',
      'overflow-y': '',
      'touch-action': '',
    });

    $('body').css({
      'overflow-y': '',
    });

    $('body').removeClass('is-freeze-window');
    $(document.body).trigger('sticky_kit:recalc');
  }
}

export function globalFreezes() {
  window.globalFunctions.freeze = freeze;
  window.globalFunctions.unfreeze = unfreeze;
}

export function freezebuttons() {
  $(document).on('click', '.js-freeze', (e) => {
    e.preventDefault();
    freeze();
  });

  $(document).on('click', '.js-unfreeze', (e) => {
    e.preventDefault();
    unfreeze();
  });
}
