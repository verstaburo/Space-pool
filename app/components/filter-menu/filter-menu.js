/* eslint-disable no-use-before-define */
import uid from 'uid';

const $ = window.$;

export default function filterMenu() {
  function isSomeFilterOpened() {
    return $('.js-nd-show-filter').is('.is-active');
  }

  function filterPopupOpen(name, type) {
    const self = $(`.js-nd-show-filter[data-nd-filter-target="${name}"]`);
    switch (type) {
      case 'popup-block': {
        if ($(self).is('.is-active')) {
          $(self).removeClass('is-active');
          const popupSection = $(`[data-nd-filter-form-block="${name}"]`);
          const popupContainer = $(`[data-nd-filter-form-block-place="${name}"]`);
          $('body').removeClass('is-filter-popup-opened');
          setTimeout(() => {
            $(popupContainer).append(popupSection);
          }, 100);
        } else {
          closeAllFiltersPopup();
          const popupSection = $(`[data-nd-filter-form-block="${name}"]`);
          const popupBlock = $(`[data-nd-filter-popup="${name}"]`);
          const popupContainer = $(popupBlock).find('[data-nd-filter-form-container]');
          $(popupContainer).append(popupSection);
          $(self).addClass('is-active');
          $('body').addClass('is-filter-popup-opened');
        }
        break;
      }
      default: {
        if ($(self).is('.is-active')) {
          $(self).removeClass('is-active');
          $('body').removeClass('is-filter-popup-opened');
        } else {
          closeAllFiltersPopup();
          $(self).addClass('is-active');
          $('body').addClass('is-filter-popup-opened');
        }
        break;
      }
    }
  }

  function closeAllFiltersPopup() {
    if (isSomeFilterOpened()) {
      const openedFilters = $('.js-nd-show-filter').filter((i, el) => $(el).is('.is-active'));
      $(openedFilters).each((i, el) => {
        const filterName = $(el).attr('data-nd-filter-target');
        const filterType = $(el).attr('data-nd-filter-target-type');
        filterPopupOpen(filterName, filterType);
      });
    }
  }

  window.globalFunctions.openFilterPopup = filterPopupOpen;
  window.globalFunctions.closeAllFilterPopups = closeAllFiltersPopup;

  $(document).on('click', '.js-nd-show-filter', (evt) => {
    evt.preventDefault();
    const self = evt.currentTarget;
    const filterName = $(self).attr('data-nd-filter-target');
    const filterType = $(self).attr('data-nd-filter-target-type');
    filterPopupOpen(filterName, filterType);
  });

  $(document).on('click', '.js-nd-filter-close', (evt) => {
    evt.preventDefault();
    const self = evt.currentTarget;
    const popup = $(self).closest('[data-nd-filter-popup]');
    const filterName = $(popup).attr('data-nd-filter-popup');
    const filterType = $(popup).attr('data-nd-filter-popup-type');
    filterPopupOpen(filterName, filterType);
  });

  $(document).on('click', (evt) => {
    const self = evt.target;
    if ($(self).closest('.filter-menu__item').length === 0) {
      closeAllFiltersPopup();
    }
  });

  const tagTemplate = '<div class="filter-tag"><div>';

  function createTagHTML(name) {
    const tagBase = $(tagTemplate);
    $(tagBase).text(name);
    return tagBase;
  }

  function clearTagCheckbox(id) {
    const checkField = $(`[data-nd-filter-check-tag="${id}"]`);
    $(checkField).prop('checked', false);
    $(checkField).trigger('change');
  }

  function setDefaultName(type) {
    const button = $(`[data-nd-filter-target="${type}"]`);
    const buttonName = $(button).find('[data-nd-filter-name]');
    const buttonDefaultName = $(button).attr('data-default-name');
    if ($(`[data-nd-filter-type="${type}"]:checked`).length === 0) {
      $(button).removeClass('is-choose is-types-all is-types-hd is-types-fd is-types-mr is-types-po');
      $(buttonName).text(buttonDefaultName);
      if (type === 'offerType') {
        if (window.Modernizr.mq(`(max-width: ${window.globalOptions.sizes.sm - 1}px)`)) {
          const buttonOfferShow = $('[data-offer-type-show]');
          const buttonOfferShowDefaultName = $(buttonOfferShow).attr('data-default-name');
          $(buttonOfferShow).find('[data-sm-name]').text(buttonOfferShowDefaultName);
        }
        $(button).addClass('is-types-all');
      }
    }
  }

  function setFilterChooseCheck(el) {
    const type = $(el).attr('data-nd-filter-type');
    const value = $(el).attr('data-nd-filter-value');
    const isTagsCreation = $(el).attr('data-nd-filter-tag-create');
    const button = $(`[data-nd-filter-target="${type}"]`);
    const buttonName = $(button).find('[data-nd-filter-name]');
    const tagContainer = $('[data-nd-filter-tags]');
    switch (type) {
      case 'offerType': {
        if ($(el).prop('checked')) {
          const offerType = $(el).attr('data-nd-filter-offer-type');
          const buttonOfferShow = $('[data-offer-type-show]');
          if (window.Modernizr.mq(`(max-width: ${window.globalOptions.sizes.sm - 1}px)`)) {
            const buttonOfferShowName = $(buttonOfferShow).attr(`data-${offerType}-name`);
            $(buttonOfferShow).find('[data-sm-name]').text(buttonOfferShowName);
          }
          $(button).removeClass('is-types-hd is-types-fd is-types-mr is-types-po is-types-all');
          $(button).addClass(`is-choose is-types-${offerType}`);
          $(buttonName).text(value);
        } else {
          setDefaultName(type);
        }
        break;
      }
      case 'teamSize': {
        if ($(el).prop('checked')) {
          $(button).addClass('is-choose');
          $(buttonName).text(value);
        } else {
          setDefaultName(type);
        }
        break;
      }
      case 'location': {
        if ($(el).prop('checked')) {
          $(button).addClass('is-choose');
          if (isTagsCreation) {
            const tag = createTagHTML(value);
            const tagId = uid();
            $(tag).attr('data-nd-filter-tag', tagId);
            $(el).attr('data-nd-filter-check-tag', tagId);
            $(tagContainer).append(tag);
            $(tagContainer).closest('.js-filter-tag-slider')[0].swiper.update();
          }
        } else {
          const tagId = $(el).attr('data-nd-filter-check-tag');
          const tag = $(`[data-nd-filter-tag="${tagId}"]`);
          const slider = $(tag).closest('.js-filter-tag-slider')[0];
          $(tag).remove();
          slider.swiper.update();
          setDefaultName(type);
        }
        break;
      }
      default:
        break;
    }
  }

  function clearFilter(button) {
    const form = $(button).closest('form');
    const checkers = $(form).find('input[type="radio"], input[type="checkbox"]');
    $(checkers).each((i, el) => {
      $(el).removeAttr('checked');
      $(el).prop('checked', false);
      $(el).trigger('change');
    });
    const rangeSource = $(form).find('.js-nd-range');
    const range = $(rangeSource).find('[data-nd-range-container]').get(0);
    if (range) {
      setTimeout(() => {
        window.globalFunctions.resetRange(range);
      }, 50);
    }
    $('.js-nd-show-filter').each((i, el) => {
      const type = $(el).attr('data-nd-filter-target');
      setDefaultName(type);
    });
  }

  window.globalFunctions.setFilterChooseForCheck = setFilterChooseCheck;

  if ($('[data-nd-filter-type]:checked').length > 0) {
    $('[data-nd-filter-type]:checked').each((i, el) => {
      setFilterChooseCheck(el);
    });
  }

  $(document).on('change', '[data-nd-filter-type]', (evt) => {
    const self = evt.currentTarget;
    if ($(self).is('[type="radio"]') || $(self).is('[type="checkbox"]')) {
      setFilterChooseCheck(self);
    }
  });

  $(document).on('click', '[data-nd-filter-tag]', (evt) => {
    const self = evt.currentTarget;
    const tagId = $(self).attr('data-nd-filter-tag');
    const slider = $(self).closest('.js-filter-tag-slider')[0];
    $(self).remove();
    slider.swiper.update();
    clearTagCheckbox(tagId);
  });

  $(document).on('click', '.js-nd-filter-reset', (evt) => {
    const self = evt.currentTarget;
    clearFilter(self);
  });

  $(document).on('change', '.filter-popup input, .filter-popup textarea, .filter-popup select', (evt) => {
    const self = evt.currentTarget;
    const popup = $(self).closest('.filter-popup');
    const reset = $(popup).find('.js-nd-filter-reset');
    $(reset).removeAttr('disabled');
  });
}
/* eslint-enable no-use-before-define */
