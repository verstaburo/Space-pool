const { $ } = window;

export default function mobileFilter() {
  function CompactFilter(el) {
    this.el = el;
    this.openBtn = $(el).find('.js-filter-open');
    this.dialogOpenBtn = $(el).find('.js-reset-dialog-open');
    this.filterOpenBtn = $(el).find('.js-filter-list-open');
    this.filterApplyBtn = $(el).find('.js-filter-apply');
    this.filterResetApply = $(el).find('.js-filter-reset-yes');
    this.filterResetCancel = $(el).find('.js-filter-reset-no');
    const tself = this;
    // открытие-закрытие диалога подтверждения сброса
    this.dialogOpen = {
      open() {
        const t = tself;
        t.elOpen.close();
        $(t.el).addClass('is-dialog-open');
      },
      close() {
        const t = tself;
        $(t.el).removeClass('is-dialog-open');
      },
      isOpen() {
        const t = tself;
        return $(t.el).hasClass('is-dialog-open');
      },
    };
    // отрытие-закрытие списков фильтров
    this.filterOpen = {
      open(name) {
        const t = tself;
        const targetList = $(t.el).find(`[data-filter-list="${name}"]`);
        $(targetList).addClass('is-active');
      },
      close() {
        const t = tself;
        const lists = $(t.el).find('[data-filter-list]');
        $(lists).removeClass('is-active');
      },
      isOpen(name) {
        const t = tself;
        const targetList = $(t.el).find(`[data-filter-list="${name}"]`);
        return $(targetList).hasClass('is-active');
      },
    };
    // открытие-закрытие основного элемента
    this.elOpen = {
      open() {
        const t = tself;
        if (!t.dialogOpen.isOpen()) {
          $(t.el).addClass('is-opened');
        }
      },
      close() {
        const t = tself;
        $(t.el).removeClass('is-opened');
        t.filterOpen.close();
      },
      isOpen() {
        const t = tself;
        return $(t.el).hasClass('is-opened');
      },
    };
    // Применение фильтра
    this.filterApply = {
      activation() {
        const t = tself;
        $(t.el).addClass('is-filter-active');
        $(t.el).removeClass('is-filter-add');
      },
      deactivation() {
        const t = tself;
        $(t.el).removeClass('is-filter-active');
      },
    };
    // Обработка радио кнопок в списках с весом
    this.listWeight = () => {
      const t = this;
      const baseSelection = $(t.el).find('[data-filter-weight-element]');
      const lists = $(baseSelection).not('[data-filter-checkbox]');
      $(lists).each((i, l) => {
        const radios = $(l).find('input[type="radio"]:checked');
        const weight = radios.length > 0 ? 1 : 0;
        $(l).attr('data-filter-weight-element', weight);
      });
    };
    // установка фильтра
    this.filterNameActivation = () => {
      const t = this;
      const baseSelection = $(t.el).find('[data-filter-list]');
      $(baseSelection).each((i, bl) => {
        const activeEl = $(bl).find('input[type="radio"]:checked');
        const filterName = $(bl).attr('data-filter-list');
        const nameContainer = $(`[data-target-filter-list="${filterName}"]`);
        const nameTargetElement = $(nameContainer).find('[data-filter-name]');
        if (activeEl.length > 0) {
          const activeElParent = $(activeEl).closest('[data-filter-radio]');
          const activeElName = $(activeElParent).find('.checkradio__content').text();
          $(nameTargetElement).text(activeElName);
          $(nameContainer).addClass('is-active');
        }
      });
    };
    // cброс имени фильтра
    this.filterNameReset = () => {
      const t = this;
      const filterNames = $(t.el).find('[data-target-filter-list]').not('.is-disabled');
      $(filterNames).each((i, n) => {
        const placeholder = $(n).find('[data-filter-placeholder]').text();
        const nameEl = $(n).find('[data-filter-name]');
        $(nameEl).text(placeholder);
        $(n).removeClass('is-active');
      });
    };
    // Обработка чекбоксов с весом
    this.checkboxWeight = () => {
      const t = this;
      const baseElements = $(t.el).find('[data-filter-weight-element]');
      const elements = $(baseElements).not('[data-filter-list]');
      $(elements).each((i, cb) => {
        const input = $(cb).find('input[type="checkbox"]');
        const weight = $(input).prop('checked') ? 1 : 0;
        $(cb).attr('data-filter-weight-element', weight);
      });
    };
    // блокировка последнего чекбокса
    this.lastCheckboxBlocked = () => {
      const t = this;
      const checkedCheckboxes = $(t.el).find('[data-filter-checkbox] input[type="checkbox"]:checked');
      if (checkedCheckboxes.length > 1) {
        $(t.el).find('[data-filter-checkbox]').removeClass('is-disabled');
      } else {
        const parentChecked = $(checkedCheckboxes).closest('[data-filter-checkbox]');
        $(parentChecked).addClass('is-disabled');
      }
    };
    // определение веса фильтров
    this.totalWeight = () => {
      const t = this;
      t.listWeight();
      t.checkboxWeight();
      const weightElements = $(t.el).find('[data-filter-weight-element="1"]');
      const totalWeight = weightElements.length;
      const counter = $(t.el).find('[data-filter-count]');
      $(counter).text(totalWeight);
    };
    // добавление фильтра и сброс старого
    this.addFilter = () => {
      const t = this;
      $(t.el).addClass('is-filter-add');
      t.filterApply.deactivation();
    };
    // сброс фильтров
    this.resetFilter = () => {
      const t = this;
      const form = $(t.el).find('form');
      form[0].reset();
      t.filterNameReset();
      t.lastCheckboxBlocked();
      t.filterApply.deactivation();
      $(t.el).removeClass('is-filter-add');
    };
    // инициализация
    this.init = () => {
      const t = this;
      // прослушка открыитя
      $(document).on('click', t.openBtn, (evt) => {
        if ($(evt.target).is(t.openBtn)) {
          evt.preventDefault();
          if (t.elOpen.isOpen()) {
            t.elOpen.close();
          } else {
            t.elOpen.open();
          }
        }
      });

      // прослушка инициализация диалога сброса
      $(document).on('click', t.dialogOpenBtn, (evt) => {
        if ($(evt.target).is(t.dialogOpenBtn)) {
          evt.preventDefault();
          if (!t.dialogOpen.isOpen()) {
            t.dialogOpen.open();
          }
        }
      });

      // прослушка открытия фильтров
      $(document).on('click', t.filterOpenBtn, (evt) => {
        const self = $(evt.target).is('.js-filter-list-open') ? $(evt.target) : $(evt.target).closest('.js-filter-list-open');
        if (self.length) {
          evt.preventDefault();
          const isDisabled = $(self).is('.is-disabled');
          if (!isDisabled) {
            const filterName = $(self).attr('data-target-filter-list');
            if (!t.filterOpen.isOpen(filterName)) {
              t.filterOpen.open(filterName);
            }
          }
        }
      });

      // приминение фильтров
      $(document).on('click', t.filterApplyBtn, (evt) => {
        if ($(evt.target).is(t.filterApplyBtn)) {
          evt.preventDefault();
          t.totalWeight();
          t.filterApply.activation();
          t.elOpen.close();
        }
      });

      // блокировка чекбоксов
      $(document).on('change', '[data-filter-checkbox] input[type="checkbox"]', () => {
        t.totalWeight();
        t.addFilter();
        t.lastCheckboxBlocked();
      });

      // активация элемента списка
      $(document).on('change', '[data-filter-radio] input[type="radio"]', () => {
        t.listWeight();
        t.filterNameActivation();
        t.filterOpen.close();
        t.totalWeight();
        t.addFilter();
      });

      // отмена сброса
      $(document).on('click', t.filterResetCancel, (evt) => {
        if ($(evt.target).is(t.filterResetCancel)) {
          evt.preventDefault();
          t.dialogOpen.close();
        }
      });

      // подтверждение сброса
      $(document).on('click', t.filterResetApply, (evt) => {
        if ($(evt.target).is(t.filterResetApply)) {
          evt.preventDefault();
          t.resetFilter();
          t.dialogOpen.close();
        }
      });
    };
    return this;
  }

  $('.compact-filter').each((i, el) => {
    const filter = new CompactFilter(el);
    filter.init();
  });
}
