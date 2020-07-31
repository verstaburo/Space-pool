/* eslint-disable class-methods-use-this */
import uid from 'uid';

const $ = window.$;

export default class SearchFilter {
  constructor(el) {
    this.el = el;
    this.buttons = $(el).find('.js-nd-show-filter');
    this.popups = $(el).find('[data-nd-filter-popup]');
    this.totalChoosed = 0;
    this.tagTemplate = '<div class="filter-tag"><div>';
    this.tagContainer = $(el).find('[data-nd-filter-tags]');
    this.blocksWithConnect = $(el).find('[data-nd-filter-connect]');
    this.jailers = $(el).find('[data-nd-filter-link-jailer]');
    this.maxLocations = $(el).attr('data-nd-filter-max-locations');
    // this._filterPopupShow = this._filterPopupShow.bind(this);
    // this._filterPopupHide = this._filterPopupHide.bind(this);
    // this._handleActivationPopup = this._handleActivationPopup.bind(this);
    // this._handleClosePopup = this._handleClosePopup.bind(this);
    // this._hideAllFilters = this._hideAllFilters.bind(this);
  }

  init() {
    const _this = this;

    const checkedItems = $('[data-nd-filter-type]:checked');

    if (checkedItems.length > 0) {
      $(checkedItems).each((i, el) => {
        _this._filterChoosed(el);
      });
    }

    _this._linkStatusChange(_this.jailers);
    _this._popupsPositioning();

    _this._bindEvents();
  }

  _bindEvents() {
    const _this = this;

    $(_this.buttons).on('click', $.proxy(_this._handleActivationPopup, _this));
    $(_this.el).find('.js-nd-filter-close').on('click', $.proxy(_this._handleClosePopup, _this));
    $(document).on('click', (evt) => {
      const self = evt.target;
      if ($(self).closest('.filter-menu__item').length === 0) {
        _this._hideAllFilters();
      }
    });
    $(document).on('change', '[data-nd-filter-link-jailer] input[type="radio"], [data-nd-filter-link-jailer] input[type="checkbox"]', $.proxy(_this._handleJailerObserver, _this));

    $(document).on('change', '[data-nd-filter-type]', (evt) => {
      const self = evt.currentTarget;
      _this._filterChoosed(self);
    });

    $(document).on('click', '[data-nd-filter-tag]', (evt) => {
      evt.preventDefault();
      const self = evt.currentTarget;
      _this._removeTag(self);
    });

    $(document).on('click', '.js-nd-filter-reset', (evt) => {
      const self = evt.currentTarget;
      _this._clearFilter(self);
    });

    $(document).on('change', '.filter-popup input, .filter-popup textarea, .filter-popup select', (evt) => {
      const self = evt.currentTarget;
      const popup = $(self).closest('.filter-popup');
      const reset = $(popup).find('.js-nd-filter-reset');
      $(reset).prop('disabled', false);
    });

    $(window).on('resize', $.proxy(_this._popupsPositioning, _this));
  }

  _popupsPositioning() {
    const _this = this;
    $(_this.popups).each((i, el) => {
      window.globalFunctions.itemPositioning(el, true);
    });
  }

  _isSomeFilterActive() {
    const _this = this;
    return $(_this.buttons).is('.is-active');
  }

  _isFilterActive(button) {
    return $(button).is('.is-active');
  }

  _hideAllFilters() {
    const _this = this;
    if (_this._isSomeFilterActive()) {
      const openedFilters = $(_this.buttons).filter((i, el) => $(el).is('.is-active'));
      $(openedFilters).each((i, el) => {
        _this._filterPopupHide(el);
      });
    }
  }

  _filterPopupShow(button) {
    const _this = this;
    const name = $(button).attr('data-nd-filter-target');
    const type = $(button).attr('data-nd-filter-target-type');
    _this._hideAllFilters();
    switch (type) {
      case 'popup-block': {
        const popupSection = $(`[data-nd-filter-form-block="${name}"]`);
        const popupBlock = $(`[data-nd-filter-popup="${name}"]`);
        const popupContainer = $(popupBlock).find('[data-nd-filter-form-container]');
        $(popupContainer).append(popupSection);
        break;
      }
      default: {
        break;
      }
    }
    setTimeout(() => {
      $(button).addClass('is-active');
      $('body').addClass('is-filter-popup-opened');
    }, 0);
  }

  _filterPopupHide(button) {
    const name = $(button).attr('data-nd-filter-target');
    const type = $(button).attr('data-nd-filter-target-type');
    switch (type) {
      case 'popup-block': {
        $(button).removeClass('is-active');
        const popupSection = $(`[data-nd-filter-form-block="${name}"]`);
        const popupContainer = $(`[data-nd-filter-form-block-place="${name}"]`);
        $('body').removeClass('is-filter-popup-opened');
        setTimeout(() => {
          $(popupContainer).append(popupSection);
        }, 100);
        break;
      }
      default: {
        $(button).removeClass('is-active');
        $('body').removeClass('is-filter-popup-opened');
        break;
      }
    }
  }

  _handleActivationPopup(evt) {
    evt.preventDefault();
    const self = evt.currentTarget;
    const _this = this;
    if (_this._isFilterActive(self)) {
      _this._filterPopupHide(self);
    } else {
      _this._filterPopupShow(self);
    }
  }

  _handleClosePopup(evt) {
    evt.preventDefault();
    const self = evt.currentTarget;
    const _this = this;
    const popup = $(self).closest('[data-nd-filter-popup]');
    const name = $(popup).attr('data-nd-filter-popup');
    const button = $(_this.buttons).filter((i, el) => $(el).is(`[data-nd-filter-target="${name}"]`));
    _this._filterPopupHide(button);
  }

  _createTagHTML(name) {
    const _this = this;
    const tagBase = $(_this.tagTemplate);
    $(tagBase).text(name);
    return tagBase;
  }

  _addTag(source) {
    const _this = this;
    const tagName = $(source).attr('data-nd-filter-value');
    const tagId = uid();
    const tag = _this._createTagHTML(tagName);
    $(tag).attr('data-nd-filter-tag', tagId);
    $(source).attr('data-nd-filter-check-tag', tagId);
    $(_this.tagContainer).append(tag);
  }

  _removeTag(source) {
    const isInput = $(source).is('input');
    if (isInput) {
      const tagId = $(source).attr('data-nd-filter-check-tag');
      const tag = $(`[data-nd-filter-tag="${tagId}"]`);
      $(source).prop('checked', false);
      $(tag).remove();
    } else {
      const tagId = $(source).attr('data-nd-filter-tag');
      const tagInput = $(`[data-nd-filter-check-tag="${tagId}"]`);
      $(tagInput).prop('checked', false);
      $(tagInput).trigger('change');
      $(source).remove();
    }
  }

  _isInputsChecked(inputs) {
    const isRadioOrCheckbox = $(inputs).is('[type="radio"]') || $(inputs).is('[type="checkbox"]');
    let checked = [];
    if (isRadioOrCheckbox) {
      checked = $(inputs).filter((i, el) => $(el).prop('checked'));
    }
    return checked.length;
  }

  _linkStatusChange(jailer) {
    const _this = this;
    const name = $(jailer).attr('data-nd-filter-link-jailer');
    const prisoners = $(_this.el).find(`[data-nd-filter-link-prisoner="${name}"]`);
    const jailerInputs = $(jailer).find('input');
    if (_this._isInputsChecked(jailerInputs) > 0) {
      $(prisoners).removeClass('is-link-inactive').addClass('is-link-active');
    } else {
      $(prisoners).removeClass('is-link-active').addClass('is-link-inactive');
    }
  }

  _handleJailerObserver(evt) {
    const _this = this;
    const self = evt.currentTarget;
    const jailer = $(self).closest('[data-nd-filter-link-jailer]');
    _this._linkStatusChange(jailer);
  }

  _howMuchChoosed() {
    const _this = this;
    const buttons = $(_this.buttons).not('[data-nd-filter-target="offerType"], [data-nd-filter-target="filter"]');
    const choosed = $(buttons).filter((i, el) => $(el).is('.is-choose'));
    _this.totalChoosed = choosed.length;
    return choosed.length;
  }

  _setDefaultButtonState(type) {
    const _this = this;
    const selfType = (type === 'locationPlace') ? 'location' : type;
    const button = $(`[data-nd-filter-target="${selfType}"]`);
    const container = $(button).find('[data-nd-filter-name]');
    const buttonDefaultName = $(button).attr('data-default-name');
    const checkedInputs = $(`[data-nd-filter-type="${type}"]:checked`);
    if (checkedInputs.length === 0) {
      $(button).removeClass('is-choose is-types-all is-types-hd is-types-fd is-types-mr is-types-po');
      $(container).text(buttonDefaultName);
      if (selfType === 'offerType') {
        const buttonOfferShow = $('[data-offer-type-show]');
        const buttonOfferShowDefaultName = $(buttonOfferShow).attr('data-default-name');
        $(buttonOfferShow).find('[data-sm-name]').text(buttonOfferShowDefaultName);
        $(button).addClass('is-types-all');
      }
      if (type === 'locationPlace') {
        const locationInput = $('[data-nd-filter-type="location"]:checked');
        const value = $(locationInput).attr('data-nd-filter-value');
        if (locationInput.length > 0) {
          _this._setButtonName(button, `${value}: all locations`);
        }
      }
    } else if (!checkedInputs.length > 0) {
      $(button).removeClass('is-choose');
      $(container).text(buttonDefaultName);
    }
  }

  _setButtonName(button, content) {
    const container = $(button).find('[data-nd-filter-name]');
    $(container).html(content);
    $(button).addClass('is-choose');
  }

  _filterChoosed(input) {
    const _this = this;
    const isRadioOrCheckbox = $(input).is('[type="radio"]') || $(input).is('[type="checkbox"]');
    const isRange = $(input).closest('.js-nd-range');
    if (isRadioOrCheckbox) {
      const type = $(input).attr('data-nd-filter-type');
      const value = $(input).attr('data-nd-filter-value');
      const isTagsCreation = $(input).attr('data-nd-filter-tag-create');
      let button = $(`[data-nd-filter-target="${type}"]`);
      const isChecked = $(input).prop('checked');
      if (isChecked) {
        if (isTagsCreation) {
          _this._addTag(input);
        }
        switch (type) {
          case 'offerType': {
            const offerType = $(input).attr('data-nd-filter-offer-type');
            const buttonOfferShow = $('[data-offer-type-show]');
            const buttonOfferShowName = $(buttonOfferShow).attr(`data-${offerType}-name`);
            $(buttonOfferShow).find('[data-sm-name]').text(buttonOfferShowName);
            $(button).removeClass('is-types-hd is-types-fd is-types-mr is-types-po is-types-all');
            $(button).addClass(`is-types-${offerType}`);
            _this._setButtonName(button, value);
            break;
          }
          case 'teamSize': {
            _this._setButtonName(button, value);
            break;
          }
          case 'location': {
            const locationPlaceInputs = $('[data-nd-filter-type="locationPlace"]:checked');
            if (locationPlaceInputs.length > 0) {
              _this._setButtonName(button, value);
            } else {
              _this._setButtonName(button, `${value}: all locations`);
            }
            break;
          }
          case 'locationPlace': {
            button = $('[data-nd-filter-target="location"]');
            const locationInput = $('[data-nd-filter-type="location"]:checked');
            const locationValue = $(locationInput).attr('data-nd-filter-value');
            _this._setButtonName(button, locationValue);
            break;
          }
          default:
            break;
        }
      } else {
        if (isTagsCreation) {
          _this._removeTag(input);
        }
        _this._setDefaultButtonState(type);
      }
    }

    if (isRange.length > 0) {
      const type = $(input).attr('data-nd-filter-type');
      const button = $(`[data-nd-filter-target="${type}"]`);
      const range = $(isRange).find('[data-nd-range-container]').get(0);
      const value = range.noUiSlider.get();
      const startValue = $(isRange).data('start');
      if (startValue[0] === Math.trunc(value[0]) && startValue[1] === Math.trunc(value[1])) {
        _this._setDefaultButtonState(type);
      } else {
        _this._setButtonName(button, `${Math.trunc(value[0])} - ${Math.trunc(value[1])}`);
      }
    }

    const filterButton = $('[data-nd-filter-target="filter"]');
    const filterButtonDefaultName = $(filterButton).attr('data-default-name');
    const filterChoosed = _this._howMuchChoosed();
    if (filterChoosed > 0) {
      this._setButtonName(filterButton, `${filterButtonDefaultName} <span>|</span> ${filterChoosed}`);
    } else {
      _this._setDefaultButtonState('filter');
    }
  }

  _handleFilterChoose(evt) {
    const self = evt.currentTarget;
    const _this = this;
    _this._filterChoosed(self);
  }

  _clearFilter(button) {
    const form = $(button).closest('form');
    const checkers = $(form).find('input[type="radio"], input[type="checkbox"]');
    $(checkers).each((i, el) => {
      $(el).prop('checked', false);
      $(el).trigger('change');
    });
    const rangeSource = $(form).find('.js-nd-range');
    const range = $(rangeSource).find('[data-nd-range-container]').get(0);
    if (range) {
      setTimeout(() => {
        window.globalFunctions.resetRange(range);
      }, 0);
    }
  }
}
/* eslint-enable class-methods-use-this */
