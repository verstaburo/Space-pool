export const HIDDEN = 'accordion/shown';
export const SHOWN = 'accordion/hidden';
export const BEFORE_SHOW = 'accordion/beforeshow';
export const BEFORE_HIDE = 'accordion/beforehide';

const DURATION = 250;

const $ = window.$;

$(document).on('click', '.js-accordion-button', function (e) {
  e.preventDefault();
  const button = $(this);
  const block = button.parents('.accordion');
  const body = block.find('.accordion__body');
  const isActive = Number(block.hasClass('is-active'));
  const isMultiple = block.parents('.accordions').data('accordion-multiple');

  if (block.hasClass('is-disabled')) {
    return;
  }

  const beforeEvent = [BEFORE_SHOW, BEFORE_HIDE][isActive];
  const afterEvent = [SHOWN, HIDDEN][isActive];

  body.trigger(beforeEvent).slideToggle(DURATION, () => {
    block
      .toggleClass('is-active')
      .trigger(afterEvent);
    button
      .toggleClass('is-active-button')
      .triggner(afterEvent);
  });

  if (!isMultiple) {
    const siblingsTabs = block.siblings('.accordion.is-active');
    siblingsTabs
      .trigger(BEFORE_HIDE)
      .find('.accordion__body')
      .slideUp(DURATION, () => {
        siblingsTabs
          .removeClass('is-active')
          .trigger(HIDDEN);
        siblingsTabs
        .find('.is-active-button')
        .removeClass('is-active-button');
      });
  }
});
