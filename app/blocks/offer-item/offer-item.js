import anime from 'animejs';
import OverlayScrollbars from 'overlayscrollbars';

const $ = window.$;

export default function offerItemOpen() {
  function getHeight(element) {
    const tar = element;
    const content = $(tar).find('[data-offer-item-content]');
    const contentHeight = $(content).length > 0 ? $(content).outerHeight(true) : 0;
    const totalHeight = contentHeight;
    return totalHeight;
  }

  function closeOffers() {
    if ($('.js-show-offer').length > 0) {
      $('.js-show-offer').each((i, el) => {
        const parent = $(el).closest('[data-offer-item]');
        const content = $(parent).find('[data-offer-item-body]');
        if ($(parent).is('.is-open')) {
          const baseHeight = getHeight(parent);
          anime({
            targets: content[0],
            duration: 300,
            easing: 'easeInOutQuad',
            height: [`${baseHeight}px`, '0px'],
            complete() {
              $(parent).removeClass('is-open');
              $(content).css({
                height: '',
              });
            },
          });
        }
      });
    }
  }

  function openOffer(btn) {
    const parent = $(btn).closest('[data-offer-item]');
    const body = $(parent).find('[data-offer-item-body]');
    const instEl = $(parent).closest('.js-scrollbar');
    if ($(parent).is('.is-open')) {
      closeOffers();
    } else {
      closeOffers();
      // $(parent).addClass('is-open');
      const baseHeight = getHeight(parent);
      anime({
        targets: body[0],
        height: ['0px', `${baseHeight}px`],
        easing: 'easeInOutQuad',
        duration: 300,
        complete() {
          $(parent).addClass('is-open');
          $(body).css({
            height: '',
          });
          if ($(instEl).length > 0) {
            const instance = OverlayScrollbars(instEl[0]);
            instance.scroll({
              el: parent[0],
            }, 300);
          }
        },
      });
    }
  }

  window.closeOfferItems = closeOffers;

  $(document).on('click', '.js-show-offer', (evt) => {
    evt.preventDefault();
    const self = $(evt.target).is('.js-show-offer') ? $(evt.target) : $(evt.target).closest('.js-show-offer');
    openOffer(self);
  });
}
