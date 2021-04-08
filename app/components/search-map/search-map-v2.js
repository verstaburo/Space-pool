import {
  freeze,
  unfreeze,
} from '../../scripts/functions/freeze';

const {
  $,
} = window;

export default function srMapToggle() {
  const bp = window.globalOptions.sizes;

  const mapMethods = {
    open() {
      $('body').addClass('map-in-fullview');
      freeze();
    },
    close() {
      $('body').removeClass('map-in-fullview');
      unfreeze();
    },
    isActive() {
      return $('body').hasClass('map-in-fullview');
    },
  };

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
}
