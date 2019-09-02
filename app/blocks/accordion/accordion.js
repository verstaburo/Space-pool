/* eslint-disable no-unused-vars */
/* eslint-disable prefer-rest-params */
const $ = window.$;

export default function accordions() {
  function setHeight(element) {
    const tar = element;
    const header = $(tar).find('.accordion__header');
    const headerHeight = $(header).length > 0 ? $(header).outerHeight(true) : 0;
    const content = $(tar).find('.accordion__body');
    const contentHeight = $(content).length > 0 ? $(content).outerHeight(true) : 0;
    const totalHeight = headerHeight + contentHeight;
    $(tar).css({
      height: `${totalHeight}px`,
    });
  }

  function updateOpenElements() {
    $('.accordions').each((i, el) => {
      const activeEl = $(el).find('.accordion.is-active');
      setHeight(activeEl);
    });
  }

  updateOpenElements();

  $(window).on('resize', updateOpenElements);

  function openAccordion(btn) {
    const container = $(btn).closest('.accordions');
    const siblings = $(container).find('.accordion');
    if (!$(btn).is('.is-active')) {
      $(siblings).removeClass('is-active');
      $(siblings).css({
        height: '',
      });
      setHeight(btn);
      $(btn).addClass('is-active');
    } else {
      $(siblings).removeClass('is-active');
      $(siblings).css({
        height: '',
      });
    }
  }

  $(document).on('click', '.js-accordion-open', (evt) => {
    const self = evt.currentTarget;
    const source = evt.target;
    if (!($(source).is('.offer-short__buttons') || $(source).closest('.offer-short__buttons').length > 0)) {
      evt.preventDefault();
      openAccordion(self);
    }
  });
}

/* eslint-disable prefer-rest-params */
/* eslint-enable no-unused-vars */
