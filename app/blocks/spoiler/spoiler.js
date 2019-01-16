/* eslint-disable no-unused-vars */
/* eslint-disable prefer-rest-params */
const $ = window.$;

export default function spoilers() {
  function setHeight(element) {
    const tar = element;
    const header = $(tar).find('.spoiler__toggle');
    const headerHeight = $(header).length > 0 ? $(header).outerHeight(true) : 0;
    const content = $(tar).find('.spoiler__content');
    const contentHeight = $(content).length > 0 ? $(content).outerHeight(true) : 0;
    const totalHeight = headerHeight + contentHeight;
    $(tar).css({
      height: `${totalHeight}px`,
    });
  }


  function openSpoiler(btn) {
    const container = $(btn).closest('.spoiler');
    const toggle = $(container).find('.spoiler__toggle .link');
    const toggleText = $(toggle).find('.link__text');
    const toggleOpenedName = $(toggle).attr('data-opened-name');
    const toggleClosedName = $(toggle).attr('data-closed-name');
    if (!$(container).is('.is-active')) {
      $(container).css({
        height: '',
      });
      setHeight(container);
      $(container).addClass('is-active');
      $(toggleText).text(toggleOpenedName);
    } else {
      $(container).removeClass('is-active');
      $(container).css({
        height: '',
      });
      $(toggleText).text(toggleClosedName);
    }
  }

  $(document).on('click', '.js-spoiler-open', (evt) => {
    const self = $(evt.target).is('.js-spoiler-open') ? $(evt.target) : $(evt.target).closest('.js-spoiler-open');
    evt.preventDefault();
    openSpoiler(self);
  });
}

/* eslint-disable prefer-rest-params */
/* eslint-enable no-unused-vars */
