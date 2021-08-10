import {
  freeze,
  unfreeze,
} from '../../scripts/functions/freeze';
import { layoutsMethods } from '../layout/layout';

const {
  $,
} = window;

export default function srMapToggle() {
  const bp = window.globalOptions.sizes;

  const mapMethods = {
    open() {
      freeze();
      const results = document.querySelector('.layout__column_results');
      if (results) {
        results.addEventListener('transitionend', () => {
          console.log('results start');
          document.body.classList.remove('is-map-animated-in');
        }, { once: true });
      }
      document.body.classList.add('map-in-fullview');
      document.body.classList.add('is-map-animated-in');
    },
    close() {
      if (layoutsMethods.whichLayerActive().list) {
        layoutsMethods.close('list', {});
      }
      const results = document.querySelector('.layout__column_results');
      if (results) {
        results.addEventListener('transitionend', () => {
          console.log('results end');
          document.body.classList.remove('is-map-animated-out');
          unfreeze();
        }, { once: true });
      }
      document.body.classList.remove('map-in-fullview');
      document.body.classList.add('is-map-animated-out');
    },
    isActive() {
      return document.body.classList.contains('map-in-fullview');
    },
  };

  window.globalFunctions.mapMethods = mapMethods;

  $(document).on('click', '.js-map-toggle-fullview', () => {
    if (mapMethods.isActive()) {
      mapMethods.close();
    } else {
      mapMethods.open();
    }
  });

  $(document).on('touchstart', '.js-map-sm-show-fullview', (evt) => {
    const tg = evt.target;
    const clickInside = tg.closest('.js-map-toggle-fullview') || tg.closest('.js-open-modal-filter');
    if (clickInside) return;
    if (!mapMethods.isActive() && window.Modernizr.mq(`(max-width: ${bp.md - 1}px)`)) {
      mapMethods.open();
    }
  });

  $(document).on('click', '.js-map-filter-show', () => {
    $('body').addClass('is-map-filter-shown');
  });
}
