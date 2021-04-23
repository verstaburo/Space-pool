const { $ } = window;

export const layoutsMethods = {
  redirectOnTab(tabTarget) {
    const tabButton = $(`[data-layout-tab="${tabTarget}"]`);
    $(tabButton).trigger('click');
  },
  open(layoutName, context) {
    const layouts = $(`[data-layout*="${layoutName}"]`);
    const detail = context || {};
    $(layouts).each((i, el) => {
      el.dispatchEvent(new CustomEvent('layout-before-show'), { bubbles: true, cancelable: true, detail });
    });
    const activeLayouts = layoutsMethods.whichLayerActive();
    switch (layoutName) {
      case 'space': {
        document.body.classList.add('layout-space-active');
        break;
      }
      case 'list': {
        if (activeLayouts.map) {
          document.body.classList.add('layout-list-active');
        }
        break;
      }
      case 'offer': {
        document.body.classList.add('layout-offer-active');
        $('.js-layout-show').removeClass('is-active');
        if (detail.sourceElement) {
          detail.sourceElement.classList.add('is-active');
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
    switch (layoutName) {
      case 'space': {
        if (activeLayouts.offer) {
          document.body.classList.remove('layout-offer-active');
          document.body.classList.add('is-layout-offer-out');
          $('.js-layout-show').removeClass('is-active');
        }
        if (activeLayouts.space) {
          document.body.classList.remove('layout-space-active');
        }
        if (activeLayouts.list) {
          document.body.classList.remove('layout-list-active');
        }
        break;
      }
      case 'list': {
        if (activeLayouts.map) {
          document.body.classList.remove('layout-list-active');
          window.mapData.resetActiveMarker('search-map');
        }
        break;
      }
      case 'offer': {
        document.body.classList.remove('layout-offer-active');
        document.body.classList.add('is-layout-offer-out');
        $('.js-layout-show').removeClass('is-active');
        if (document.getElementById('search-map')) {
          window.mapData.resetActiveMarker('search-map');
        }
        break;
      }
      default:
        break;
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

    if (isStopEvtBubbling) {
      evt.stopPropagation();
    }

    const layoutName = $(_this).attr('data-layout-target');
    if (layoutName) {
      layoutsMethods.open(layoutName, { sourceElement: _this, marker: undefined });
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
    const activeLayouts = layoutsMethods.whichLayerActive();
    if (activeLayouts.map) {
      if (activeLayouts.offer) {
        layoutsMethods.close('offer', {});
      } else if (activeLayouts.list) {
        layoutsMethods.close('list', {});
      } else if (activeLayouts.space) {
        layoutsMethods.close('space', {});
      }
    } else if (activeLayouts.offer) {
      layoutsMethods.close('offer', {});
    } else if (activeLayouts.space) {
      layoutsMethods.close('space', {});
    }
  });
}
