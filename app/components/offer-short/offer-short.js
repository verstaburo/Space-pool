const $ = window.$;

$(document).on('click', '.offer-short__buttons', (evt) => {
  evt.preventDefault();
  evt.stopPropagation();
});
