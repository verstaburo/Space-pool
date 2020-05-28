/* eslint-disable class-methods-use-this */
const $ = window.$;

export default class Autocomplete {
  constructor(el) {
    this.el = el;
    this.source = $(el).attr('data-autocomplete-url');
    this.container = $(el).parent()[0];
    this.currentFocus = -1;
    this.setFocus = this.setFocus.bind(this);
    this.loadList = this.loadList.bind(this);
    this.generateList = this.generateList.bind(this);
    this.closeAllLists = this.closeAllLists.bind(this);
    this.el.autocmpl = this;
  }
  init() {
    const t = this;
    t.loadList();
    t.el.addEventListener('input', (evt) => {
      const self = evt.currentTarget;
      const val = $(self).val();
      if (val) {
        self.autocmpl.setFocus(-1);
        self.autocmpl.generateList(val);
      }
    });

    t.el.addEventListener('keydown', (evt) => {
      const self = evt.currentTarget;
      const th = self.autocmpl;
      const list = th.list;
      let elements;
      const key = evt.keyCode;
      if (list) {
        elements = list.getElementsByTagName('li');
      }
      switch (key) {
        case 40: {
          evt.preventDefault();
          th.setFocus(th.currentFocus + 1);
          th.addActive(elements);
          break;
        }
        case 38: {
          evt.preventDefault();
          th.setFocus(th.currentFocus - 1);
          th.addActive(elements);
          break;
        }
        case 13: {
          evt.preventDefault();
          const currIndex = th.currentFocus;
          if (currIndex > -1 && elements) {
            elements[currIndex].click();
          }
          break;
        }
        default: {
          break;
        }
      }
    });
    document.addEventListener('click', (evt) => {
      const self = evt.target;
      // const th = self.autocmpl;
      if (!$(self).is(t.el) && $(self).closest(t.list).length === 0 && !$(self).is(t.list)) {
        t.closeAllLists();
      }
    });
  }
  setFocus(val) {
    const t = this;
    t.currentFocus = val;
  }
  // получаем список
  loadList() {
    const t = this;
    const url = t.source;
    t.loadStatus = 'progress';
    $.ajax({
      url,
      type: 'GET',
      success(response) {
        // const ul = $(response);
        // const allLi = $(ul).find('li');
        // const sourceList = [];
        // $(allLi).each((i, el) => {
        //   sourceList.push({
        //     icon: $(el).attr('data-id'),
        //     name: $(el).text(),
        //     hint: $(el).attr('data-hint'),
        //   });
        // });
        t.sourceList = response;
        t.loadStatus = 'success';
      },
      error() {
        t.loadStatus = 'error';
      },
    });
  }
  // генерируем список
  generateList(value) {
    const t = this;
    const status = t.loadStatus;
    const val = value.toUpperCase();
    const vlength = val.length;
    const input = t.el;
    if (status === 'error') {
      t.loadList();
    }
    if (status === 'success') {
      t.closeAllLists();
      const wrapper = document.createElement('DIV');
      const arr = t.sourceList;
      wrapper.setAttribute('class', 'autocomplete-list js-scrollbar');
      t.container.appendChild(wrapper);
      const list = document.createElement('UL');
      for (let i = 0; i < arr.length; i += 1) {
        const elem = arr[i];
        const name = elem.name.toUpperCase();
        // if (elem.name.substr(0, vlength).toUpperCase() === val) {
        if (name.toUpperCase().includes(val)) {
          const item = document.createElement('LI');
          const start = name.indexOf(val);
          const end = start + vlength;
          item.classList.add(`icon-${elem.icon}`);
          item.innerHTML = `${elem.name.substr(0, start)}<b>${elem.name.substr(start, vlength)}</b>${elem.name.substr(end)}`;
          item.addEventListener('click', (evt) => {
            const self = evt.currentTarget;
            // const form = $(self).closest('form');
            // const hiddenInput = $(form).find('[data-hidden-productId]');
            $(input).val($(self).text());
            // $(hiddenInput).val(self.getAttribute('data-id'));
            t.closeAllLists();
          });
          list.appendChild(item);
        }
      }
      if ($(list).find('li').length === 0) {
        const item = document.createElement('DIV');
        const message = 'no results found';
        item.setAttribute('class', 'autocomplete-list__empty');
        item.innerHTML = message;
        wrapper.appendChild(item);
      } else {
        wrapper.appendChild(list);
      }
      $(t.el).addClass('is-autocomplete');
      t.list = list;
      window.globalFunctions.scrollbarInit(list);
    }
  }
  // подсвечиваем элемен с фокусом
  addActive(items) {
    const t = this;
    let currentFocus = t.currentFocus;
    if (items) {
      const length = items.length;
      t.removeActive(items);
      if (currentFocus >= length) {
        currentFocus = 0;
      }
      if (currentFocus < 0) {
        currentFocus = length - 1;
      }
      $(items[currentFocus]).addClass('is-active');
    }
  }
  // убираем подсветку с элемента потерявшекго фокус
  removeActive(items) {
    $(items).each((i, el) => {
      if ($(el).is('.is-active')) {
        $(el).removeClass('is-active');
      }
    });
  }
  // закрываем другие выпадашки кроме заданной
  closeAllLists(notUs) {
    const t = this;
    const elem = notUs ? t.list : '';
    $(t.el).removeClass('is-autocomplete');
    $('.autocomplete-list').not(elem).remove();
  }
}
/* eslint-enable class-methods-use-this */
