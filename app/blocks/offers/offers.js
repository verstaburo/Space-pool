const $ = window.$;

export default function emptyOffersState() {
  // we catch the moment when the object becomes empty
  const state = ['offer', 'offers'];
  // реагируем на удаление элемента
  $(document).on('changeOffer', '.offers', (evt) => {
    let message = '';
    const offerParent = evt.target;
    // получаем оставшиеся обсчитываемые элементы
    const totalOffer = $(offerParent).find('.offer').length;
    // формируем сообщение и устанавливаем состояние
    if (totalOffer !== 0) {
      const index = totalOffer === 1 ? 0 : 1;
      $(offerParent).removeClass('is-empty');
      message = `${totalOffer} ${state[index]}`;
    } else {
      message = 'no offers';
      $(offerParent).addClass('is-empty');
    }
    const counter = $(offerParent).find('[data-offers-count]');
    $(counter).text(message);
  });
}
