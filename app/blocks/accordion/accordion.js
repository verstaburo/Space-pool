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

  $(document).on('click', '.js-accordion-open', (evt) => {
    const self = $(evt.target).is('.js-accordion-open') ? $(evt.target) : $(evt.target).closest('.js-accordion-open');
    evt.preventDefault();
    console.log('click');
    console.log(self);
    const container = $(self).closest('.accordions');
    const siblings = $(container).find('.accordion');
    console.log(siblings);
    if (!$(self).is('.is-active')) {
      console.log('click is-active');
      $(siblings).removeClass('is-active');
      $(siblings).css({
        height: '',
      });
      setHeight(self);
      $(self).addClass('is-active');
    } else {
      $(siblings).removeClass('is-active');
      $(siblings).css({
        height: '',
      });
    }
  });
}

/* eslint-disable prefer-rest-params */
/* eslint-enable no-unused-vars */

// $(document).on('click', '.js-accordion-open', (e) => {
//   e.preventDefault();
//   const block = e.target.parentElement.parentElement;
//   const acc = $('.accordion');
//   const accBtn = $('.accordion__button');

//   if (block.classList.contains('is-active-body')) {
//     acc.removeClass('is-active-body');
//     accBtn.removeClass('is-active-button');
//   } else {
//     acc.removeClass('is-active-body');
//     accBtn.removeClass('is-active-button');
//     block.classList.add('is-active-body');
//     e.target.classList.add('is-active-button');
//   }
// });
