/* eslint-disable no-unused-vars */
import {
  freeze,
  unfreeze,
} from '../../scripts/functions/freeze';
import { layoutsMethods } from '../layout/layout';
// import requestTimeout from '../../scripts/functions/requestTimeout';

const {
  $,
} = window;

export default function srMapToggle() {
  const bp = window.globalOptions.sizes;

  const mapMethods = {
    open() {
      freeze();

      document.body.classList.add('map-in-fullview');
      document.body.classList.add('is-map-animated-in');

      setTimeout(() => {
        document.body.classList.remove('is-map-animated-in');
      }, 500);
    },
    close() {
      if (layoutsMethods.whichLayerActive().list) {
        layoutsMethods.close('list', {});
      }

      document.body.classList.remove('map-in-fullview');
      document.body.classList.add('is-map-animated-out');

      setTimeout(() => {
        document.body.classList.remove('is-map-animated-out');
        unfreeze();
      }, 500);
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
