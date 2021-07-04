const { $ } = window;

export const layoutsMethods = {
  redirectOnTab(tabTarget) {
    const tabButton = $(`[data-layout-tab="${tabTarget}"]`);
    $(tabButton).trigger('click');
  },
  open(layoutName, context, describe) {
    const totalLayouts = $('[data-layout]');
    const layouts = $(`[data-layout*="${layoutName}"]`);
    const detail = context || {};
    const layoutTitleOffer = $('[data-layout-title-offer]');
    const layoutBoxes = $('[data-layout-title-boxes]');
    const layoutTitleSpace = $('[data-layout-title-space]');
    $(layouts).each((i, el) => {
      el.dispatchEvent(new CustomEvent('layout-before-show'), { bubbles: true, cancelable: true, detail });
    });
    $(totalLayouts).removeClass('is-current');
    $(layouts).addClass('is-current');
    const activeLayouts = layoutsMethods.whichLayerActive();
    switch (layoutName) {
      case 'space': {
        document.body.classList.add('layout-space-active');
        document.body.setAttribute('data-layout-last', 'space');
        if (describe.title) {
          layoutTitleSpace.text(describe.title);
        }
        layoutBoxes.removeClass('is-green is-red is-orange is-blue');
        break;
      }
      case 'list': {
        if (activeLayouts.map) {
          document.body.classList.add('layout-list-active');
          document.body.setAttribute('data-layout-last', 'list');
          layoutBoxes.removeClass('is-green is-red is-orange is-blue');
        }
        break;
      }
      case 'offer': {
        document.body.classList.add('layout-offer-active');
        $('.js-layout-show').removeClass('is-active');
        if (detail.sourceElement) {
          detail.sourceElement.classList.add('is-active');
        }
        document.body.setAttribute('data-layout-last', 'offer');
        if (describe.title) {
          layoutTitleOffer.text(describe.title);
        }
        layoutBoxes.removeClass('is-green is-red is-orange is-blue');
        if (describe.color) {
          layoutBoxes.addClass(`is-${describe.color}`);
        }
        break;
      }
      default:
        break;
    }
    $(layouts).each((i, el) => {
      $(el).one('transitionend', (evt) => {
        const _self = evt.currentTarget;
        _self.dispatchEvent(new CustomEvent('layout-after-show'), { bubbles: true, cancelable: true, detail });
      });
    });
  },
  close(layoutName, context) {
    const layouts = $(`[data-layout*="${layoutName}"]`);
    const detail = context || {};
    $(layouts).each((i, el) => {
      el.dispatchEvent(new CustomEvent('layout-before-close'), { bubbles: true, cancelable: true, detail });
      el.classList.add('is-layout-animated-out');
    });
    const activeLayouts = layoutsMethods.whichLayerActive();
    $('.js-layout-show').removeClass('is-active');

    let last;

    switch (layoutName) {
      case 'space': {
        if (activeLayouts.offer && activeLayouts.list) {
          last = 'offer';
        } else if (activeLayouts.offer) {
          last = 'offer';
        } else if (activeLayouts.list) {
          last = 'list';
        }
        document.body.classList.remove('layout-space-active');
        break;
      }
      case 'offer': {
        if (activeLayouts.space && activeLayouts.list) {
          last = 'space';
        } else if (activeLayouts.space) {
          last = 'space';
        } else if (activeLayouts.list) {
          last = 'list';
        }
        if (!activeLayouts.map && document.getElementById('search-map')) {
          window.mapData.resetActiveMarker('search-map');
        }
        document.body.classList.remove('layout-offer-active');
        break;
      }
      case 'list': {
        document.body.classList.remove('layout-list-active');
        window.mapData.resetActiveMarker('search-map');
        break;
      }
      default:
        break;
    }

    if (last !== undefined) {
      document.body.setAttribute('data-layout-last', last);
    } else {
      document.body.removeAttribute('data-layout-last');
    }

    $(layouts).each((i, el) => {
      $(el).one('transitionend', (evt) => {
        const _self = evt.currentTarget;
        _self.dispatchEvent(new CustomEvent('layout-after-close'), { bubbles: true, cancelable: true, detail });
        _self.classList.remove('is-layout-animated-out');
        document.body.classList.remove('is-layout-offer-out');
      });
    });
  },
  whichLayerActive() {
    return {
      list: document.body.classList.contains('layout-list-active'),
      space: document.body.classList.contains('layout-space-active'),
      offer: document.body.classList.contains('layout-offer-active'),
      map: document.body.classList.contains('map-in-fullview'),
    };
  },
};

window.globalFunctions.layoutsMethods = layoutsMethods;

export default function layoutsInit() {
  $(document).on('click', '.js-layout-show', (evt) => {
    const _this = evt.currentTarget;
    const isStopEvtBubbling = $(_this).is('[data-dead-zone]');

    evt.preventDefault();

    if (isStopEvtBubbling) {
      evt.stopPropagation();
    }

    const layoutName = $(_this).attr('data-layout-target');
    const layoutTitle = $(_this).attr('data-layout-title');
    const layoutColor = $(_this).attr('data-layout-title-color');
    if (layoutName) {
      layoutsMethods.open(
        layoutName,
        { sourceElement: _this, marker: undefined },
        { title: layoutTitle, color: layoutColor },
      );
    }
  });

  $(document).on('click', '.js-layout-tab-redirect', (evt) => {
    const _this = evt.currentTarget;
    const tabName = $(_this).attr('data-layout-tab-target');
    if (tabName) {
      layoutsMethods.redirectOnTab(tabName);
    }
  });

  $(document).on('click', '.js-layout-close', (evt) => {
    const _this = evt.currentTarget;
    const layoutName = $(_this).attr('data-layout-close-target');
    if (layoutName) {
      layoutsMethods.close(layoutName, {});
    }
  });

  $(document).on('click', '.js-layout-close-active', () => {
    // const activeLayouts = layoutsMethods.whichLayerActive();
    const lastLayout = document.body.getAttribute('data-layout-last');
    if (lastLayout !== undefined) {
      layoutsMethods.close(lastLayout, {});
    }
  });

  $(document).on('mousewheel', '.layout_static .layout__wrapper', (evt) => {
    const el = evt.currentTarget;
    const height = el.clientHeight;
    const { scrollHeight } = el;
    const layout = el.closest('.layout_static');
    const nextEl = layout.nextElementSibling;
    const delta = evt.originalEvent.wheelDelta;

    if ((el.scrollTop === (scrollHeight - height) && delta < 0)) {
      if (nextEl) {
        $('body, html').stop().animate({
          scrollTop: $(nextEl).offset().top - 100,
        }, 1000, 'swing');
      }
    } else if (delta > 0) {
      const wH = window.innerHeight;
      const elSizes = el.getBoundingClientRect();
      if (elSizes.bottom < wH && elSizes.bottom > 0) {
        $('body, html').stop().animate({
          scrollTop: $(el).offset().top,
        }, 1000, 'swing');
      }
    }
  });
}
