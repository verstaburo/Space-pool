// Скрипт "замораживает" страничку, запрещая скролл
const $ = window.$;

export function freeze() {
  const h = $('html');

  // const stickyBlocks = $('.js-sticky-block');

  // if (stickyBlocks.length > 0) {
  //   $(stickyBlocks).each((i, el) => {
  //     const attrStyle = $(el).attr('style');
  //     $(el).attr('data-style', attrStyle);
  //   });
  // }

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

    $(document.body).trigger('sticky_kit:recalc');
  }

  // setTimeout(() => {
  //   if (stickyBlocks.length > 0) {
  //     $(stickyBlocks).each((i, el) => {
  //       const attrStyle = $(el).attr('data-style');
  //       $(el).attr('style', attrStyle);
  //       $(el).removeAttr('data-style');
  //     });
  //   }
  // }, 4);
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

    $(document.body).trigger('sticky_kit:recalc');
  }
}

export function freezebuttons() {
  window.globalFunctions.freeze = freeze;
  window.globalFunctions.unfreeze = unfreeze;

  $(document).on('click', '.js-freeze', (e) => {
    e.preventDefault();
    freeze();
  });

  $(document).on('click', '.js-unfreeze', (e) => {
    e.preventDefault();
    unfreeze();
  });
}
