import OfferSelect from './OfferSelect';

const $ = window.$;

export default function offerSelect() {
  $('.js-offer-select').each((i, el) => {
    const select = new OfferSelect(el);
    select.init();
  });
}
