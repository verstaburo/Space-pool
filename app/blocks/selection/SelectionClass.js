export default class Selection {
  constructor(el) {
    this.el = el;
    this.head = el.querySelector('[data-selection-head]');
    this.drop = el.querySelector('[data-selection-drop]');
    this.content = el.querySelector('[data-selection-content]');
    this.closeBtn = el.querySelector('[data-selection-close]');
    this.clearBtn = el.querySelector('[data-selection-clear]');
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

    _this.clearBtn.addEventListener('click', (evt) => {
      evt.preventDefault();
      _this._clear();
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
  }

  _close() {
    const _this = this;
    document.body.classList.remove('is-selection-open');
    _this.el.classList.remove('is-open');
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

  _handlerSetValue(evt) {
    evt.preventDefault();
    const _this = this;
    const items = _this.content.querySelectorAll('[data-selection-item]:checked');
    if (items.length > 1) {
      let result = '';
      items.forEach((el) => {
        const type = el.getAttribute('data-selection-item-type');
        const value = items[0].getAttribute('data-selection-item-value') || items[0].value;
        if (type === 'city') {
          result += value;
        } else if (type === 'area' && value !== 'All areas') {
          result = value;
        } else if (type !== 'area' && type !== 'city') {
          result += `${value}, `;
        }
      });
      _this._setValue(result);
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
      _this._setValue(value);
    }
  }

  _observeNewItems(rec) {
    const _this = this;
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
