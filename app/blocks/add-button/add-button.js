const $ = window.$;

export default function addToFavorite() {
  $(document).on('click', '.js-add-favorite', (evt) => {
    const self = $(evt.target).is('.js-add-favorite') ? $(evt.target) : $(evt.target).closest('.js-add-favorite');
    // наименование кнопки в активном состоянии
    const activeName = $(self).attr('data-active-name');
    // наименование кнопки в состоянии покоя
    const simpleName = $(self).attr('data-name');
    // элемент сердечко
    const heart = $(self).find('.button-heart');
    // целевой элемент для наименования кнопки
    const nameEl = $(self).find('[data-button-text]');
    // проверяем активна ли кнопка
    if ($(self).hasClass('is-active')) {
      $(self).removeClass('is-active');
      $(heart).removeClass('is-active');
      $(nameEl).text(simpleName);
    } else {
      $(self).addClass('is-active');
      $(heart).addClass('is-active');
      $(nameEl).text(activeName);
    }
  });
}
