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
      $('body').addClass('map-in-fullview').addClass('is-map-animated-in');
      $('.layout__column_map').one('animationend', () => {
        $('body').removeClass('is-map-animated-in');
      });
      freeze();
    },
    close() {
      if (layoutsMethods.whichLayerActive().list) {
        layoutsMethods.close('list', {});
      }
      $('body').removeClass('map-in-fullview').addClass('is-map-animated-out');
      $('.layout__column_map').one('animationend', () => {
        $('body').removeClass('is-map-animated-out');
      });
      unfreeze();
    },
    isActive() {
      return $('body').hasClass('map-in-fullview');
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

  $(document).on('touchstart', '.js-map-sm-show-fullview', () => {
    if (!mapMethods.isActive() && window.Modernizr.mq(`(max-width: ${bp.sm - 1}px)`)) {
      mapMethods.open();
    }
  });

  $(document).on('click', '.js-map-filter-show', () => {
    $('body').addClass('is-map-filter-shown');
  });
}
