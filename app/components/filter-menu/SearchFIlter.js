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
    this.locations = {};
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
    _this.el.searchFilter = _this;
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
      evt.preventDefault();
      const self = evt.currentTarget;
      _this._clearFilter(self);
    });

    $(document).on('change', '.filter-popup input, .filter-popup textarea, .filter-popup select', (evt) => {
      const self = evt.currentTarget;
      const popup = $(self).closest('.filter-popup');
      const reset = $(popup).find('.js-nd-filter-reset');
      $(reset).prop('disabled', false);
    });

    $(document).on('click', '.js-nd-filter-redirect', _this._handleRedirectFilter);

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
    const prisoners = $(`[data-nd-filter-link-prisoner="${name}"]`);
    const jailerInputs = $(jailer).find('input');
    const prisonerInputs = $(prisoners).find('input');
    if (_this._isInputsChecked(jailerInputs) > 0) {
      $(prisoners).removeClass('is-link-inactive').addClass('is-link-active');
      $(prisonerInputs).removeAttr('disabled');
    } else {
      const rangeSource = $(prisoners).find('.js-nd-range');
      const range = $(rangeSource).find('[data-nd-range-container]').get(0);
      if (range) {
        setTimeout(() => {
          window.globalFunctions.resetRange(range);
        }, 0);
      }
      $(prisoners).removeClass('is-link-active').addClass('is-link-inactive');
      $(prisonerInputs).attr('disabled', 'disabled');
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
        if (locationInput.length > 0 && $(locationInput).attr('data-nd-filter-areas-url') !== undefined) {
          _this._setButtonName(button, `${value}: all locations`);
        } else {
          _this._setButtonName(button, `${value}`);
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
            } else if ($(input).attr('data-nd-filter-areas-url') === undefined) {
              _this._setButtonName(button, value);
            } else {
              _this._setButtonName(button, `${value}: all locations`);
            }
            _this._generateLocationAreasList(input);
            break;
          }
          case 'locationPlace': {
            const locationAreas = $('[data-nd-filter-type="locationPlace"]:checked');
            if (locationAreas.length > _this.maxLocations) {
              $(input).prop('checked', false);
            } else {
              button = $('[data-nd-filter-target="location"]');
              const locationInput = $('[data-nd-filter-type="location"]:checked');
              const locationValue = $(locationInput).attr('data-nd-filter-value');
              _this._setButtonName(button, locationValue);
              if (isTagsCreation) {
                _this._addTag(input);
              }
            }
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
    const form = $(button).closest('.filter-popup');
    const allFields = $(form).find('input[type="text"], textarea');
    $(allFields).each((i, el) => {
      const field = el;
      field.value = el.defaultValue;
      $(el).trigger('change');
    });
    const checkers = $(form).find('input[type="radio"], input[type="checkbox"]');
    $(checkers).each((i, el) => {
      $(el).removeAttr('checked');
      $(el).prop('checked', false);
      $(el).trigger('change');
    });
    if ($(form).is('[data-nd-filter-popup="location"]') || $(form).is('[data-nd-filter-popup="filter"]')) {
      const allLocations = $(checkers).filter((i, el) => $(el).is('[data-nd-filter-type="location"]')).get(0);
      $(allLocations).attr('checked', 'checked');
      $(allLocations).prop('checked', true);
      $(allLocations).trigger('change');
    }
    if ($(form).is('[data-nd-filter-popup="offerType"]')) {
      const allListings = $(checkers).get(0);
      $(allListings).attr('checked', 'checked');
      $(allListings).prop('checked', true);
      $(allListings).trigger('change');
    }
    const rangeSource = $(form).find('.js-nd-range');
    const range = $(rangeSource).find('[data-nd-range-container]').get(0);
    if (range) {
      setTimeout(() => {
        window.globalFunctions.resetRange(range);
      }, 0);
    }
  }

  _removeAllTags() {
    const _this = this;
    const tagsContainer = _this.tagContainer;
    const tags = $(tagsContainer).find('[data-nd-filter-tag]');
    $(tags).each((i, el) => {
      _this._removeTag(el);
    });
  }

  _generateLocationAreaButton(data) {
    const input = document.createElement('input');
    const parent = document.createElement('label');
    const content = document.createElement('div');
    input.classList.add('check-button__input');
    parent.classList.add('check-button');
    parent.classList.add('nd-form__check');
    content.classList.add('check-button__content');
    const attributes = data.inputAttributes;
    const clsList = data.clsList.split(',');
    const title = data.title;
    $(clsList).each((i, el) => {
      parent.classList.add(el.replace(/\s+/g, ' ').trim());
    });
    if (attributes) {
      input.setAttribute('name', attributes.name);
      input.setAttribute('type', attributes.type);
      input.setAttribute('value', attributes.value);
      // if (attributes.checked) {
      //   input.setAttribute('checked', attributes.checked);
      // }
      if (attributes.dataAttributes) {
        Object.keys(attributes.dataAttributes).forEach((key) => {
          input.setAttribute(`data-${key}`, attributes.dataAttributes[key]);
        });
      }
    }

    $(content).html(title);
    $(parent).append(input);
    $(parent).append(content);
    return parent;
  }

  _loadingStateOnAreas(state) {
    const areasContainer = $('[data-nd-filter-areas-container]');
    if (state === 'start') {
      const loader = document.createElement('div');
      $(loader).addClass('loader');
      $(areasContainer).append(loader);
      $(areasContainer).addClass('is-loading');
    }

    if (state === 'end') {
      $(areasContainer).removeClass('is-loading');
    }
  }

  _loadLocationAreaData(data, callbackSuccess, callbackError) {
    const _this = this;
    const urlArr = data;
    const locations = _this.locations;
    const area = urlArr[1].toLowerCase();
    const url = urlArr[0];
    $.ajax({
      url,
      type: 'GET',
      success(response) {
        const result = {}.hasOwnProperty.call(response, area) ? response[area] : false;
        if (result) {
          locations[area] = result;
          locations[area].status = 'success';
          callbackSuccess();
        } else {
          locations[area].status = 'error';
          callbackError();
        }
      },
      error() {
        locations[area].status = 'error';
        callbackError();
      },
    });
  }

  _generateLocationAreasList(el) {
    const self = el;
    const _this = this;
    const locations = _this.locations;
    const urlData = $(self).attr('data-nd-filter-areas-url');
    const urlArr = urlData ? urlData.split(',') : null;
    if (urlArr === null) {
      _this._removeAllTags();
      const areasContainer = $('[data-nd-filter-areas-container]');
      $(areasContainer).empty();
    } else {
      const area = urlArr[1].toLowerCase();
      _this._loadingStateOnAreas('start');
      const success = {}.hasOwnProperty.call(locations, area);
      _this._removeAllTags();
      if (!success || locations[area].status === 'error') {
        _this._loadLocationAreaData(urlArr, () => {
          _this._loadingStateOnAreas('end');
          _this._generateLocationAreasList(el);
        }, () => {
          _this._loadingStateOnAreas('end');
          const areasContainer = $('[data-nd-filter-areas-container]');
          $(areasContainer).text('Failed to load data');
        });
      } else {
        const data = locations[area];
        _this._loadingStateOnAreas('end');
        const areasContainer = $('[data-nd-filter-areas-container]');
        $(areasContainer).empty();
        $(data).each((i, dt) => {
          const item = _this._generateLocationAreaButton(dt);
          $(areasContainer).append(item);
        });
        const checkedItems = $('[data-nd-filter-type="locationPlace"]:checked');
        if (checkedItems.length > 0) {
          $(checkedItems).each((k, it) => {
            _this._filterChoosed(it);
          });
        }
      }
    }
  }

  _locationListPreset(list) {
    const _this = this;
    const allAreasButton = $('[data-nd-filter-type="locationPlace"]');
    let alreadyChecked = 0;
    $(allAreasButton).each((i, el) => {
      const isChecked = $(list).filter((ix, li) => $(el).val().toLowerCase() === li.toLowerCase());
      if (isChecked.length && alreadyChecked <= _this.maxLocations) {
        $(el).prop('checked', true);
        $(el).attr('checked', 'checked');
        _this._filterChoosed(el);
        alreadyChecked += 1;
      }
    });
  }

  _handleRedirectFilter(evt) {
    const self = evt.currentTarget;
    const target = $(self).attr('data-nd-filter-redirect');
    const targetButton = $(`[data-nd-filter-target="${target}"]`);
    $(targetButton).trigger('click');
  }
}
/* eslint-enable class-methods-use-this */
