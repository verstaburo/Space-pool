const $ = window.$;

export default function filterTagsScroll() {
  $(document).on('mouseenter', '.filter-tags', (evt) => {
    const _this = evt.currentTarget;
    _this.isMouseUnder = true;
  });

  $(document).on('mouseleave', '.filter-tags', (evt) => {
    const _this = evt.currentTarget;
    _this.isMouseUnder = false;
  });

  const eventName = ('onWheel' in document) ? 'wheel' : 'mousewheel';

  window.addEventListener(eventName, (evt) => {
    const filterTags = document.querySelector('.filter-tags');
    if (filterTags && filterTags.isMouseUnder) {
      evt.preventDefault();
      const _this = filterTags;
      if (evt.deltaY > 0) {
        _this.scrollLeft += 100;
      } else {
        _this.scrollLeft -= 100;
      }
    }
  }, {
    passive: false,
  });
}
