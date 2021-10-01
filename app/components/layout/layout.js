/* eslint-disable max-len */
const { $ } = window;

export const layoutsMethods = {
  // инициируем переход на вкладку с нужным контентом на мобильном
  redirectOnTab(tabTarget) {
    const tabButton = $(`[data-layout-tab="${tabTarget}"]`);
    $(tabButton).trigger('click');
  },
  // получаем слой, который был открыт последним
  getLastStepName() {
    const hasLast = document.body.hasAttribute('data-layout-last');
    return hasLast ? document.body.getAttribute('data-layout-last') : '';
  },
  getPrevStepName() {
    const hasPrev = document.body.hasAttribute('data-layout-previous');
    return hasPrev ? document.body.getAttribute('data-layout-previous') : '';
  },
  getPrevPrevStepName() {
    const hasPrevPrev = document.body.hasAttribute('data-layout-previous-prev');
    return hasPrevPrev ? document.body.getAttribute('data-layout-previous-prev') : '';
  },
  getNumberOfSteps() {
    const hasSteps = document.body.hasAttribute('data-layout-steps-number');
    const number = document.body.getAttribute('data-layout-steps-number');
    return hasSteps ? Number.parseInt(number, 10) : 0;
  },
  getCurrentMainLayout() {
    return $('[data-layout-main].is-current');
  },
  getPreviousMainLayout() {
    return $('[data-layout-main].is-previous');
  },
  open(layoutName, context, describe) {
    // const totalLayouts = $('[data-layout]');
    // Определяем был ли предидущий шаг
    const prevLayout = layoutsMethods.getPrevStepName();

    // Определяем последний активный слой
    const lastLayout = layoutsMethods.getLastStepName();

    const detail = context || {};

    const layoutTitleOffer = document.querySelector('[data-layout-title-offer]');
    const layoutBoxes = document.querySelector('[data-layout-title-boxes]');
    const layoutTitleSpace = document.querySelector('[data-layout-title-space]');

    if (lastLayout === layoutName) {
      if (detail.sourceElement && lastLayout === 'offer') {
        $('.js-layout-show, .js-sm-layout-show').removeClass('is-active');

        if (describe.title && layoutTitleOffer) {
          layoutTitleOffer.innerText = describe.title;
        }

        if (layoutBoxes && describe.color) {
          layoutBoxes.classList.remove('is-green', 'is-red', 'is-orange', 'is-blue', 'is-dark-blue');

          layoutBoxes.classList.add(`is-${describe.color}`);
        }

        detail.sourceElement.classList.add('is-active');
      }
      return;
    }

    // Определяем будут ли слои при открывании наслаиваться или смахиваться
    const step = layoutsMethods.getNumberOfSteps();
    let newStep = step;
    let animationType = 'enter';
    console.log('open');

    if (step < 3) {
      document.body.classList.remove('is-layout-direction-back');
      document.body.classList.add('is-layout-direction-next');
      newStep += 1;
    } else {
      document.body.classList.remove('is-layout-direction-next');
      document.body.classList.add('is-layout-direction-back');
      newStep -= 1;
      animationType = 'leave';
    }

    // // Определяем в мобильном мы разрешении или нет
    // const isSm = window.matchMedia(`(max-width: ${window.globalOptions.ndsizes.sm - 1}px)`).matches;

    // // Определяем является страница поисковой
    // const isSinglePage = document.querySelector('.layout_stable');

    // Находим целевой слой
    const layout = document.querySelector(`[data-layout*="${layoutName}"]:not([data-layout-header], [data-layout-side])`);

    // Находим предидущий целевой слой
    const currentActive = document.querySelector('.is-current[data-layout-main]');

    const activeLayouts = layoutsMethods.whichLayerActive();

    document.body.setAttribute('data-layout-previous-prev', prevLayout);

    document.body.setAttribute('data-layout-previous', lastLayout);

    switch (layoutName) {
      case 'space': {
        layoutsMethods.redirectOnTab('tab-space-describe');

        if (describe && describe.title && layoutTitleSpace) {
          layoutTitleSpace.innerText = describe.title;
        }

        if (layoutBoxes) {
          layoutBoxes.classList.remove('is-green', 'is-red', 'is-orange', 'is-blue', 'is-dark-blue');
        }

        if (lastLayout) {
          document.body.classList.remove(`layout-${lastLayout}-active`);
        }

        document.body.classList.add('layout-space-active');

        document.body.setAttribute('data-layout-last', 'space');

        break;
      }
      case 'list': {
        if (activeLayouts.map) {
          if (lastLayout) {
            document.body.classList.remove(`layout-${lastLayout}-active`);
          }

          document.body.classList.add('layout-list-active');

          document.body.setAttribute('data-layout-last', 'list');

          if (layoutBoxes) {
            layoutBoxes.classList.remove('is-green', 'is-red', 'is-orange', 'is-blue', 'is-dark-blue');
          }
        }
        break;
      }
      case 'offer': {
        if (lastLayout) {
          document.body.classList.remove(`layout-${lastLayout}-active`);
        }

        document.body.classList.add('layout-offer-active');

        $('.js-layout-show, .js-sm-layout-show').removeClass('is-active');

        if (detail.sourceElement) {
          detail.sourceElement.classList.add('is-active');
        }

        document.body.setAttribute('data-layout-last', 'offer');

        if (describe.title && layoutTitleOffer) {
          layoutTitleOffer.innerText = describe.title;
        }

        if (layoutBoxes && describe.color) {
          layoutBoxes.classList.remove('is-green', 'is-red', 'is-orange', 'is-blue', 'is-dark-blue');

          layoutBoxes.classList.add(`is-${describe.color}`);
        }
        break;
      }
      default:
        break;
    }

    if (layoutName !== 'list') {
      if (step < 3) {
        if (currentActive) {
          currentActive.classList.remove('is-current');
          currentActive.classList.add('is-previous');
        }

        if (layout) {
          layout.classList.add('is-current', `layout-animation-${animationType}-from`);
          console.log('add animation from');
          console.log(layout);

          layout.dispatchEvent(new CustomEvent('layout-before-show'), { bubbles: true, cancelable: true, detail });

          requestAnimationFrame(() => {
            layout.classList.remove(`layout-animation-${animationType}-from`);
            layout.classList.add(`layout-animation-${animationType}-active`, `layout-animation-${animationType}-to`);
            console.log('remove animation from, add others');
            console.log(layout);
          });

          layout.addEventListener('transitionend', (evt) => {
            const _self = evt.currentTarget;
            _self.dispatchEvent(new CustomEvent('layout-after-show'), { bubbles: true, cancelable: true, detail });

            _self.classList.remove(`layout-animation-${animationType}-active`, `layout-animation-${animationType}-to`);
            console.log('remove animation class');
            console.log(_self);
            if (currentActive) {
              currentActive.classList.remove('is-previous');
            }
          }, { once: true });
        }
      } else {
        if (layout) {
          layout.classList.add('is-current');
        }

        if (currentActive) {
          currentActive.classList.remove('is-current');
          currentActive.classList.add('is-previous', `layout-animation-${animationType}-from`);

          currentActive.dispatchEvent(new CustomEvent('layout-before-show'), { bubbles: true, cancelable: true, detail });

          requestAnimationFrame(() => {
            currentActive.classList.remove(`layout-animation-${animationType}-from`);
            currentActive.classList.add(`layout-animation-${animationType}-active`, `layout-animation-${animationType}-to`);
          });

          currentActive.addEventListener('transitionend', (evt) => {
            const _self = evt.currentTarget;
            _self.dispatchEvent(new CustomEvent('layout-after-show'), { bubbles: true, cancelable: true, detail });

            _self.classList.remove(`layout-animation-${animationType}-active`, `layout-animation-${animationType}-to`, 'is-previous');
          }, { once: true });
        }
      }
    }

    // устанавливаем номер текущего шага
    document.body.setAttribute('data-layout-steps-number', newStep);
  },
  close(layoutName, context) {
    const step = layoutsMethods.getNumberOfSteps();
    console.log('close');

    const animationType = 'leave';
    document.body.classList.remove('is-layout-direction-next');
    document.body.classList.add('is-layout-direction-back');

    // Определяем последний активный слой
    const lastLayout = layoutsMethods.getLastStepName();

    // Определяем предидущий активный слой
    const prevLayout = step === 1 ? '' : layoutsMethods.getPrevStepName();

    // Определяем стартовый шаг
    const prevPrevLayout = step === 1 ? '' : layoutsMethods.getPrevPrevStepName();

    const layout = step === 1 ? false : document.querySelector(`[data-layout*="${prevLayout}"]:not([data-layout-header], [data-layout-side])`);

    const currentActive = document.querySelector('.is-current[data-layout-main]');

    const header = document.querySelector('[data-layout-header]');

    const detail = context || {};

    $('.js-layout-show, .js-sm-layout-show').removeClass('is-active');

    document.body.classList.remove(`layout-${lastLayout}-active`);

    if (prevLayout) {
      document.body.classList.add(`layout-${prevLayout}-active`);
    }

    if (step === 1) {
      document.body.classList.add('layout-interface-leave-animation-from');
    }

    if (layout) {
      layout.classList.add('is-current');
    }

    if (currentActive) {
      currentActive.dispatchEvent(new CustomEvent('layout-before-close'), { bubbles: true, cancelable: true, detail });
      currentActive.classList.remove('is-current');
      currentActive.classList.add('is-previous', `layout-animation-${animationType}-from`);

      requestAnimationFrame(() => {
        currentActive.classList.remove(`layout-animation-${animationType}-from`);
        currentActive.classList.add(`layout-animation-${animationType}-active`, `layout-animation-${animationType}-to`);
      });
    }

    // if (document.getElementById('search-map')) {
    //   window.mapData.resetActiveMarker('search-map');
    // }

    document.body.setAttribute('data-layout-last', prevLayout);
    document.body.setAttribute('data-layout-previous', prevPrevLayout);
    document.body.setAttribute('data-layout-previous-prev', '');

    if (currentActive) {
      currentActive.addEventListener('transitionend', (evt) => {
        const _self = evt.currentTarget;
        _self.dispatchEvent(new CustomEvent('layout-after-close'), { bubbles: true, cancelable: true, detail });
        _self.classList.remove(`layout-animation-${animationType}-active`, `layout-animation-${animationType}-to`, 'is-previous');
      }, {
        once: true,
      });
    }

    if (header && step === 1) {
      requestAnimationFrame(() => {
        document.body.classList.remove('layout-interface-leave-animation-from');
        document.body.classList.add('layout-interface-leave-animation-to');
      });

      header.addEventListener('transitionend', () => {
        document.body.classList.remove('layout-interface-leave-animation-to');
      }, {
        once: true,
      });
    }

    // устанавливаем номер текущего шага
    document.body.setAttribute('data-layout-steps-number', step - 1);
  },
  whichLayerActive() {
    return {
      list: document.body.classList.contains('layout-list-active'),
      space: document.body.classList.contains('layout-space-active'),
      offer: document.body.classList.contains('layout-offer-active'),
      map: document.body.classList.contains('map-in-fullview'),
    };
  },
  isLayoutExist(layoutName) {
    return document.querySelector(`[data-layout*="${layoutName}"]`);
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

  $(document).on('click', '.js-marker-link', (evt) => {
    const _this = evt.currentTarget;

    evt.preventDefault();

    // const layoutName = 'space';
    const url = _this.href;
    const isExistOfferLayout = document.body.classList.contains('layout-offer-active');
    const isSinglePage = document.querySelector('.layout_stable');

    if (isSinglePage) {
      if (isExistOfferLayout) {
        layoutsMethods.close('offer', {});
      } else {
        window.open(url, '_blank');
      }
    } else {
      layoutsMethods.open(
        'space',
        { sourceElement: undefined, marker: _this.mm },
      );
    }
  });

  $(document).on('click', '.js-sm-layout-show', (evt) => {
    const _this = evt.currentTarget;
    const isStopEvtBubbling = $(_this).is('[data-dead-zone]');

    if (window.matchMedia('(max-width: 767px)').matches) {
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
    const lastLayout = layoutsMethods.getLastStepName();
    if (lastLayout) {
      layoutsMethods.close(lastLayout, {});
    }
  });
}
