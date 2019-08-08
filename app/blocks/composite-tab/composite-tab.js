const $ = window.$;

export default function compositeTab() {
  const cmpsFunc = {
    // разблокировка таба
    activeEl(activator) {
      const compositeName = $(activator).attr('data-composite-activator');
      const element = $(`[data-composite-el="${compositeName}"]`);
      const textarea = $(`[data-composite-textarea="${compositeName}"]`);
      $(textarea).removeAttr('disabled', 'disabled');
      $(element).removeClass('is-disabled');
    },
    // блокировка таба
    disableEl(activator) {
      const compositeName = $(activator).attr('data-composite-activator');
      const element = $(`[data-composite-el="${compositeName}"]`);
      const textarea = $(`[data-composite-textarea="${compositeName}"]`);
      $(textarea).attr('disabled', 'disabled');
      $(element).addClass('is-disabled');
    },
    // возвращаем первый активный чекбокс из оставшихся
    lastOn() {
      const triggers = $('[data-composite-activator]');
      const active = $(triggers).filter((i, el) => $(el).prop('checked'));
      return active[0];
    },
    // возвращаем набор активных табов
    lastActive() {
      const elements = $('[data-composite-el]');
      const active = $(elements).filter((i, el) => $(el).is('.is-active'));
      return active;
    },
    // сохранены ли данные во вкладке
    isSaved(compositeName) {
      const button = $(`[data-composite-el="${compositeName}"]`);
      const textarea = $(`[data-composite-textarea="${compositeName}"]`);
      return ($(button).is('.is-saved') && $(textarea).val().length > 0);
    },
    // проверяем сколько рабочих чекеров
    howMuchCheck() {
      const triggers = $('[data-composite-activator]');
      const active = $(triggers).filter((i, el) => $(el).prop('checked'));
      return $(active).length;
    },
    // были ли изменения во вкладке
    isChanged(compositeName) {
      const textarea = $(`[data-composite-textarea="${compositeName}"]`);
      return $(textarea).is('.is-changed');
    },
    // установить состояние сохранения
    saveEl(compositeName) {
      const element = $(`[data-composite-el="${compositeName}"]`);
      const textarea = $(`[data-composite-textarea="${compositeName}"]`);
      $(element).addClass('is-saved');
      $(textarea).removeClass('is-changed');
    },
    // снять состояние сохрания
    unsaveEl(compositeName) {
      const element = $(`[data-composite-el="${compositeName}"]`);
      $(element).removeClass('is-saved');
    },
    // открыть вкладку
    open(activator) {
      const el = activator;
      const compositeName = $(el).attr('data-composite-el');
      const target = $(`[data-composite-target*="${compositeName}"]`);
      const textarea = $(`[data-composite-textarea="${compositeName}"]`);
      $(el).addClass('is-active');
      $(target).addClass('is-active is-opened');
      $(target).removeClass('is-freeze');
      $(textarea).removeAttr('disabled');
    },
    // закрыть вкладку
    close(activator) {
      const elements = activator || $('[data-composite-el]');
      let targets;
      if (activator) {
        targets = $(activator).map((i, el) => {
          const compositeName = $(el).attr('data-composite-el');
          return $(`[data-composite-target*="${compositeName}"]`);
        });
      } else {
        targets = $('[data-composite-target]');
      }
      $(elements).removeClass('is-active');
      $(targets).each((i, el) => {
        $(el).removeClass('is-active is-opened is-freeze');
      });
    },
    // замораживаем вкладку, если снят последний чекер
    freeze(compositeName) {
      const target = $(`[data-composite-target*="${compositeName}"]`);
      const textarea = $(`[data-composite-textarea="${compositeName}"]`);
      $(target).addClass('is-freeze');
      $(textarea).attr('disabled', 'disabled');
    },
    // замораживаем вкладку, если снят последний чекер
    unfreeze() {
      const targets = $('[data-composite-target]');
      const textareas = $('[data-composite-textarea]');
      $(targets).removeClass('is-freeze');
      $(textareas).removeAttr('disabled');
    },
    // открыть попап
    popupPrepare(popup, compositeName, callback) {
      const elements = $(popup).find('[data-popup-element]');
      const visibleElements = $(popup).find(`[data-popup-element*="${compositeName}"]`);
      const btnContinue = $(popup).find('[data-composite-disable]');
      const btnSave = $(popup).find('[data-composite-save-button]');
      const btnThrowUp = $(popup).find('[data-composite-newtab]');
      const innertab = $(popup).find('[data-composite-return]');
      if ($(btnContinue).length > 0) {
        $(btnContinue).attr('data-composite-disable', compositeName);
      }
      if ($(btnSave).length > 0) {
        $(btnSave).attr('data-composite-save-button', compositeName);
      }
      if ($(btnThrowUp).length > 0) {
        $(btnThrowUp).attr('data-composite-newtab', compositeName);
      }
      if ($(innertab).length > 0) {
        $(innertab).attr('data-composite-return', compositeName);
      }
      $(elements).addClass('hide');
      $(visibleElements).removeClass('hide');
      setTimeout(() => {
        callback(popup);
      }, 50);
    },
    // переключить панели с кнопками
    showSaveButton() {
      const buttonArea = $('[data-composite-save-area]');
      const formPanel = $('[data-composite-panel]');
      $(buttonArea).removeClass('hide');
      $(formPanel).addClass('hide');
    },
    // переключить панели с кнопками
    hideSaveButton() {
      const buttonArea = $('[data-composite-save-area]');
      const formPanel = $('[data-composite-panel]');
      $(buttonArea).addClass('hide');
      $(formPanel).removeClass('hide');
    },
    // блокировка кнопок
    blockButtons() {
      const btnSave = $('form').find('[data-composite-save-button]');
      const btnSaveFull = $('form').find('[data-composite-full-save]');
      btnSave.attr('disabled', 'disabled');
      btnSaveFull.attr('disabled', 'disabled');
      btnSave.addClass('is-disabled');
      btnSaveFull.addClass('is-disabled');
    },
    // разблокировка кнопок
    unblockButtons() {
      const btnSave = $('form').find('[data-composite-save-button]');
      const btnSaveFull = $('form').find('[data-composite-full-save]');
      btnSave.removeAttr('disabled');
      btnSaveFull.removeAttr('disabled');
      btnSave.removeClass('is-disabled');
      btnSaveFull.removeClass('is-disabled');
    },
  };

  // активируем переключатели вкладок
  $(document).on('change', '[data-composite-activator]', (evt) => {
    const self = evt.currentTarget;
    const compositeName = $(self).attr('data-composite-activator');
    const selfButton = $(`[data-composite-el="${compositeName}"]`);
    const count = cmpsFunc.howMuchCheck();
    if (count === 0) {
      cmpsFunc.disableEl(self);
      cmpsFunc.close(selfButton);
      cmpsFunc.freeze(compositeName);
      cmpsFunc.blockButtons();
    } else if (count === 1) {
      if ($(self).prop('checked')) {
        cmpsFunc.activeEl(self);
        cmpsFunc.open(selfButton);
        cmpsFunc.unblockButtons();
        cmpsFunc.unfreeze();
      } else {
        cmpsFunc.disableEl(self);
        const lastOn = cmpsFunc.lastOn();
        cmpsFunc.close(selfButton);
        if (window.Modernizr.mq(`(min-width: ${window.globalOptions.sizes.sm}px)`) && lastOn) {
          const newCompositeName = $(lastOn).attr('data-composite-activator');
          const button = $(`[data-composite-el="${newCompositeName}"]`);
          cmpsFunc.open(button);
        }
        cmpsFunc.unblockButtons();
        cmpsFunc.unfreeze();
      }
    } else if ($(self).prop('checked')) {
      // разблокировка таба при установке галочки
      cmpsFunc.activeEl(self);
    } else if ($(selfButton).is('.is-active')) {
      // блокировка таба при снятии галочки, если он активен
      cmpsFunc.disableEl(self);
      const lastOn = cmpsFunc.lastOn();
      cmpsFunc.close(selfButton);
      if (window.Modernizr.mq(`(min-width: ${window.globalOptions.sizes.sm}px)`) && lastOn) {
        const newCompositeName = $(lastOn).attr('data-composite-activator');
        const button = $(`[data-composite-el="${newCompositeName}"]`);
        cmpsFunc.open(button);
      }
    } else {
      // блокировка таба при снятии галочки, если он не активен
      cmpsFunc.disableEl(self);
    }
  });

  // работа с изменением textarea
  $(document).on('input', '[data-composite-textarea]', (evt) => {
    const self = evt.currentTarget;
    const compositeName = $(self).attr('data-composite-textarea');
    const button = $('[data-composite-save-button]');
    const value = $(self).val();
    if (value) {
      // контент добавлен в поле
      cmpsFunc.unsaveEl(compositeName);
      $(button).attr('data-composite-save-button', compositeName);
      cmpsFunc.showSaveButton();
      $(self).addClass('is-changed');
    } else {
      // контент удален из поле
      $(self).addClass('is-changed');
      cmpsFunc.unsaveEl(compositeName);
      cmpsFunc.hideSaveButton();
    }
  });

  /* eslint-disable no-unused-vars */
  function textareaSave(obj) {
    return new Promise((resolve) => {
      resolve(true);
    });
  }

  function fullSave(obj) {
    return new Promise((resolve) => {
      resolve(true);
    });
  }
  /* eslint-enable no-unused-vars */

  window.saveTextarea = textareaSave;
  window.savefull = fullSave;

  // сохранение частичное
  $(document).on('click', '[data-composite-save-button]', (evt) => {
    const self = evt.currentTarget;
    const compositeName = $(self).attr('data-composite-save-button');
    const textarea = $(`[data-composite-textarea="${compositeName}"]`);
    const callback = $(self).attr('data-textarea-save-callback');
    const popupId = $(self).attr('data-src').split('#').pop();
    const popup = $(`#${popupId}`);
    $.fancybox.close();
    if ($(textarea).val().length > 0) {
      // сохраняем при непустом поле
      window[callback](textarea).then((readySave) => {
        if (readySave) {
          cmpsFunc.saveEl(compositeName);
          cmpsFunc.hideSaveButton();
          if (window.Modernizr.mq(`(max-width: ${window.globalOptions.sizes.sm - 1}px)`)) {
            cmpsFunc.close();
          }
        }
      });
    } else {
      // выводим предупреждение при пустом поле
      cmpsFunc.popupPrepare(popup, compositeName, window.globalFunctions.openPopup);
    }
  });

  // напоминание о сохранение на мобиле
  $(document).on('click', '[data-composite-reminder-button]', (evt) => {
    const self = evt.currentTarget;
    const compositeName = $(self).attr('data-composite-reminder-button');
    const popupSaveId = $(self).attr('data-src').split('#').pop();
    const popupSave = $(`#${popupSaveId}`);
    if (cmpsFunc.isChanged(compositeName)) {
      // при закрытии попапа с полем предупреждаем, если были изменения
      cmpsFunc.popupPrepare(popupSave, compositeName, window.globalFunctions.openPopup);
    } else {
      // закрываем, если изменений не было
      cmpsFunc.close();
    }
  });

  // coхранение полное
  $(document).on('click', '[data-composite-full-save]', (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    const self = evt.currentTarget;
    const callback = $(self).attr('data-callback');
    const form = $(self).closest('form');
    const activators = $(form).find('[data-composite-activator]');
    const activeBoxes = $(activators).filter((i, el) => $(el).prop('checked'));
    const tabsActive = $(activeBoxes).map((i, el) => {
      const compositeName = $(el).attr('data-composite-activator');
      const tab = $(`[data-composite-el="${compositeName}"]`);
      return tab;
    }).get();
    const tabsUnsaved = $(tabsActive).filter((i, el) => !$(el).is('.is-saved'));
    const empty = $(tabsUnsaved).filter((i, el) => {
      const compositeName = $(el).attr('data-composite-el');
      const textarea = $(`[data-composite-textarea="${compositeName}"]`);
      return $(textarea).val().length === 0;
    });
    if ($(empty).length > 0) {
      // выводим предупреждение, если есть не заполненное поле при выбранной опции
      const popupId = $(self).attr('data-src').split('#').pop();
      const compositeName = $(empty[0]).attr('data-composite-el');
      cmpsFunc.popupPrepare($(`#${popupId}`), compositeName, window.globalFunctions.openPopup);
    } else {
      // отправляем форму в колбэк
      window[callback](form);
    }
  });

  // пропускаем вкладку
  $(document).on('click', '[data-composite-disable]', (evt) => {
    evt.preventDefault();
    const self = evt.currentTarget;
    const compositeName = $(self).attr('data-composite-disable');
    const activator = $(`[data-composite-activator="${compositeName}"]`);
    const element = $(`[data-composite-el="${compositeName}"]`);
    // отключаем параметр, если был отказ
    $(activator).prop('checked', '');
    cmpsFunc.disableEl(activator);
    if ($(element).is('.is-active')) {
      const lastOn = cmpsFunc.lastOn();
      cmpsFunc.close();
      if (window.Modernizr.mq(`(min-width: ${window.globalOptions.sizes.sm}px)`) && lastOn) {
        const newCompositeName = $(lastOn).attr('data-composite-activator');
        const button = $(`[data-composite-el="${newCompositeName}"]`);
        cmpsFunc.open(button);
      }
    }
    $.fancybox.close();
  });

  // переключаем вкладки
  $(document).on('click', '[data-composite-el]', (evt) => {
    const self = evt.currentTarget;
    const notactive = $('[data-composite-el]').not(self);
    const newCompositeName = $(self).attr('data-composite-el');
    const changingElements = $('[data-changing-content]');
    const showChangingElements = $(`[data-changing-content*="${newCompositeName}"]`);
    cmpsFunc.unfreeze();
    if (!$(self).is('.is-active')) {
      // не открываем вкладку еще раз, если она активна
      const last = cmpsFunc.lastActive();
      const compositeName = $(last).attr('data-composite-el');
      if ($(last).length > 0) {
        // если существует другая активная вкладка
        if (!$(self).is('.is-disabled') && cmpsFunc.isChanged(compositeName)) {
          // если переключаетель активен и были изменения в предидущей вкладке
          const textarea = $(`[data-composite-textarea="${compositeName}"]`);
          const value = $(textarea).val().length;
          if (window.Modernizr.mq(`(min-width: ${window.globalOptions.sizes.sm}px)`)) {
            // только на десктопе показываем попап
            if (value > 0) {
              const popupIdSave = $(self).attr('data-src-save').split('#').pop();
              const popupSave = $(`#${popupIdSave}`);
              cmpsFunc.popupPrepare(popupSave, compositeName, window.globalFunctions.openPopup);
            } else {
              const popupIdEmpty = $(self).attr('data-src-empty').split('#').pop();
              const popupEmpty = $(`#${popupIdEmpty}`);
              cmpsFunc.popupPrepare(popupEmpty, compositeName, window.globalFunctions.openPopup);
            }
          }
          cmpsFunc.close(notactive);
          cmpsFunc.open(self);
        } else if (!$(self).is('.is-disabled')) {
          // если переключаетель активен и изменений не было
          cmpsFunc.close(notactive);
          cmpsFunc.open(self);
        }
      } else {
        // если других активных нет
        cmpsFunc.open(self);
      }
    } else if (window.Modernizr.mq(`(max-width: ${window.globalOptions.sizes.sm - 1}px)`)) {
      // на мобильном вкладку открываем даже если она уже активна
      cmpsFunc.close(notactive);
      cmpsFunc.open(self);
    }
    // переключаем отображаемые элементы
    $(changingElements).addClass('hide');
    $(showChangingElements).removeClass('hide');
    cmpsFunc.hideSaveButton();
  });

  // переключаем вкладку не сохраняя и обнуляем поле
  $(document).on('click', '[data-composite-newtab]', (evt) => {
    const self = evt.currentTarget;
    const compositeName = $(self).attr('data-composite-newtab');
    const textarea = $(`[data-composite-textarea="${compositeName}"]`);
    $(textarea).removeClass('is-changed');
    $(textarea).val('');
    $.fancybox.close();
    if (window.Modernizr.mq(`(max-width: ${window.globalOptions.sizes.sm - 1}px)`)) {
      cmpsFunc.close();
    }
  });

  // возврат на вкладку
  $(document).on('click', '[data-composite-return]', (evt) => {
    const self = evt.currentTarget;
    const compositeName = $(self).attr('data-composite-return');
    const tab = $(`[data-composite-el="${compositeName}"]`);
    const notactive = $('[data-composite-el]').not(tab);
    const changingElements = $('[data-changing-content]');
    const showChangingElements = $(`[data-changing-content*="${compositeName}"]`);
    const textarea = $(`[data-composite-textarea="${compositeName}"]`);
    cmpsFunc.close(notactive);
    cmpsFunc.open(tab);
    $(changingElements).addClass('hide');
    $(showChangingElements).removeClass('hide');
    cmpsFunc.hideSaveButton();
    if ($(textarea).val().length === 0) {
      $(textarea).removeClass('is-changed');
    }
    $(textarea).focus();
    $.fancybox.close();
  });
}
