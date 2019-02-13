const $ = window.$;

export default function blockHeightRounding() {
  const blocks = $('[data-rounding-target]');

  function rounding() {
    if (blocks.length > 0) {
      $(blocks).each((i, el) => {
        $(el).css({
          'min-height': 0,
        });
        let height = Math.round($(el).outerHeight());
        const modulo = height % 2;
        if (modulo > 0) {
          height += 1;
        }
        $(el).css({
          'min-height': `${height}px`,
        });
      });
    }
  }

  rounding();

  $(window).on('resize', rounding);
}
