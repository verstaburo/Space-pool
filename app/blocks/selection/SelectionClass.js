import {
  freeze,
  unfreeze,
} from '../../scripts/functions/freeze';

export default class Selection {
  constructor(el) {
    this.el = el;
    this.head = el.querySelector('[data-selection-head]');
    this.drop = el.querySelector('[data-selection-drop]');
    this.content = el.querySelector('[data-selection-content]');
    this.closeBtn = el.querySelector('[data-selection-close]');
    this.clearBtns = el.querySelectorAll('[data-selection-clear]');
    this.setBtn = el.querySelector('[data-selection-setter]');
    this.valueField = el.querySelector('[data-selection-value]');
  }

  init() {
    const _this = this;
    _this._bindEvents();
    _this.el.selection = _this;
  }

  _bindEvents() {
    const _this = this;
    _this.head.addEventListener('click', (evt) => {
      evt.preventDefault();
      if (_this._isOpen()) {
        _this._close();
      } else {
        _this._open();
      }
    });

    _this.closeBtn.addEventListener('click', (evt) => {
      evt.preventDefault();
      _this._close();
    });

    _this.clearBtns.forEach((el) => {
      el.addEventListener('click', _this._handlerClearFilter.bind(_this));
    });

    _this.setBtn.addEventListener('click', _this._handlerSetValue.bind(_this));

    document.addEventListener('click', (evt) => {
      const slf = evt.target;
      if (!(slf.closest('.selection') || slf.matches('.selection'))) {
        _this._close();
      }
    });

    const items = _this.content.querySelectorAll('[data-selection-item]');
    if (items.length) {
      items.forEach((el) => {
        el.addEventListener('change', _this._handlerSetValueOnChange.bind(_this));
      });
    }
  }

  _isOpen() {
    const _this = this;
    return _this.el.matches('.is-open');
  }

  _open() {
    const _this = this;
    const other = document.querySelectorAll('.selection');
    other.forEach((el) => {
      if (el !== _this.el) {
        if (el.selection) {
          el.selection._close();
        }
      }
    });
    document.body.classList.add('is-selection-open');
    _this.el.classList.add('is-open');
    if (window.Modernizr.mq(`(max-width: ${window.globalOptions.sizes.sm - 1}px)`)) {
      freeze();
    }
  }

  _close() {
    const _this = this;
    document.body.classList.remove('is-selection-open');
    _this.el.classList.remove('is-open');
    if (window.Modernizr.mq(`(max-width: ${window.globalOptions.sizes.sm - 1}px)`)) {
      unfreeze();
    }
  }

  _clear() {
    const _this = this;
    const {
      content,
    } = _this;
    const contentSibling = content.previousSibling;
    const form = document.createElement('form');
    form.append(content);
    form.reset();
    contentSibling.after(content);
    _this.valueField.innerHTML = '';
    _this.el.classList.remove('is-selected');
  }

  _handlerClearFilter(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    const _this = this;
    _this._clear();
    _this._close();
  }

  _handlerSetValue(evt) {
    evt.preventDefault();
    const _this = this;
    const items = _this.content.querySelectorAll('[data-selection-item]:checked');
    if (items.length > 1) {
      const result = {};
      items.forEach((el) => {
        const type = el.getAttribute('data-selection-item-type');
        const value = el.getAttribute('data-selection-item-value') || el.value;
        result[type] = value;
      });
      if (result.area && result.area !== 'All areas') {
        _this._setValue(result.area);
      } else if (result.city) {
        _this._setValue(result.city);
      } else if (result.team) {
        _this._setValue(result.team);
      } else {
        _this._setValue(result.type);
      }
    } else {
      const value = items[0].getAttribute('data-selection-item-value') || items[0].value;
      _this._setValue(value);
    }
    _this._close();
  }

  _setValue(value) {
    const _this = this;
    _this.valueField.innerHTML = '';
    _this.valueField.append(value);
    _this.el.classList.add('is-selected');
  }

  _handlerSetValueOnChange(evt) {
    const _this = this;
    const slf = evt.currentTarget;
    if (slf.checked) {
      const value = slf.getAttribute('data-selection-item-value') || slf.value;
      // let value = '';
      // const type = slf.getAttribute('data-selection-item-type');
      // const selfValue = slf.getAttribute('data-selection-item-value') || slf.value;
      // if (type === 'city' || type === 'area') {
      //   const items = _this.content.querySelectorAll('[data-selection-item]:checked');
      //   const result = {};
      //   items.forEach((el) => {
      //     const elType = el.getAttribute('data-selection-item-type');
      //     const elValue = el.getAttribute('data-selection-item-value') || el.value;
      //     result[elType] = elValue;
      //   });
      //   if (result.area && result.area !== 'All areas') {
      //     value = result.area;
      //   } else {
      //     value = result.city;
      //   }
      // } else {
      //   value = selfValue;
      // }
      if (window.Modernizr.mq(`(min-width: ${window.globalOptions.sizes.sm}px)`)) {
        _this._setValue(value);
        _this._close();
      }
    }
  }

  _observeNewItems(rec) {
    const _this = this;
    console.log(rec);
    if (rec.type === 'childList') {
      const addedNodesList = rec.addedNodes;
      if (addedNodesList.length) {
        const items = addedNodesList.filter((el) => el.matches('[data-selection-item]'));
        items.forEach((el) => {
          el.addEventListener('change', _this._handlerSetValueOnChange.bind(_this));
        });
      }
    }
  }

  _observeChilds() {
    const _this = this;
    const observer = new MutationObserver(_this._observeNewItems);
    observer.observe(_this.content, {
      childList: true,
      subtree: true,
    });
  }
}
