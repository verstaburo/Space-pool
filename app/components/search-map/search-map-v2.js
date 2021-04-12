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
      $('body').addClass('map-in-fullview').addClass('is-map-animated-in');
      setTimeout(() => {
        $('body').removeClass('is-map-animated-in');
      }, 500);
      freeze();
    },
    close() {
      $('body').removeClass('map-in-fullview').addClass('is-map-animated-out');
      setTimeout(() => {
        $('body').removeClass('is-map-animated-out');
      }, 500);
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

  $(document).on('click', '.js-map-filter-show', () => {
    $('body').addClass('is-map-filter-shown');
  });
}
