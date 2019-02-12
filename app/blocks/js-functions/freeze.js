// Скрипт "замораживает" страничку, запрещая скролл
const $ = window.$;

export function freeze() {
  const h = $('html');

  const stickyBlocks = $('.js-sticky-block');

  if (stickyBlocks.length > 0) {
    $(stickyBlocks).each((i, el) => {
      const attrStyle = $(el).attr('style');
      $(el).attr('data-style', attrStyle);
    });
  }

  h.addClass('freeze');

  if (h.css('position') !== 'fixed') {
    const top = h.scrollTop() ? h.scrollTop() : $('body').scrollTop();

    if (window.innerWidth > h.width()) {
      h.css('overflow-y', 'scroll');
    }

    h.css({
      width: '100%',
      height: '100%',
      position: 'fixed',
      top: -top,
    });
  }
  setTimeout(() => {
    if (stickyBlocks.length > 0) {
      $(stickyBlocks).each((i, el) => {
        const attrStyle = $(el).attr('data-style');
        $(el).attr('style', attrStyle);
        $(el).removeAttr('data-style');
      });
    }
  }, 50);
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
    });
  }
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
