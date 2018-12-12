
const $ = window.$;

$(document).on('click', '.js-accordion-button', (e) => {
  e.preventDefault();
  const block = e.target.parentElement.parentElement;
  const acc = $('.accordion');
  const accBtn = $('.accordion__button');

  if (block.classList.contains('is-active-body')) {
    acc.removeClass('is-active-body');
    accBtn.removeClass('is-active-button');
  } else {
    acc.removeClass('is-active-body');
    accBtn.removeClass('is-active-button');
    block.classList.add('is-active-body');
    e.target.classList.add('is-active-button');
  }
});
