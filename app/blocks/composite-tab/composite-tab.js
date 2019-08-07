const $ = window.$;

export default function compositeTab() {
  const compositeTabs = {
    activeEl(activator) {
      const compositeName = $(activator).attr('data-composite-activator');
      const element = $(`[data-composite-el="${compositeName}"]`);
      const textarea = $(`[data-composite-textarea="${compositeName}"]`);
      $(textarea).removeAttr('disabled', 'disabled');
      $(element).removeClass('is-disabled');
    },
    disableEl(activator) {
      const compositeName = $(activator).attr('data-composite-activator');
      const element = $(`[data-composite-el="${compositeName}"]`);
      const textarea = $(`[data-composite-textarea="${compositeName}"]`);
      $(textarea).attr('disabled', 'disabled');
      $(element).addClass('is-disabled');
    },
    lastOn() {
      const triggers = $('[data-composite-activator]');
      const active = $(triggers).filter((i, el) => $(el).prop('checked'));
      return active[0];
    },
    lastActive() {
      const elements = $('[data-composite-el]');
      const active = $(elements).filter((i, el) => $(el).is('.is-active'));
      return active;
    },
    isSaved(compositeName) {
      const button = $(`[data-composite-el="${compositeName}"]`);
      const textarea = $(`[data-composite-textarea="${compositeName}"]`);
      return ($(button).is('.is-saved') && $(textarea).val().length > 0);
    },
    isChanged(compositeName) {
      const textarea = $(`[data-composite-textarea="${compositeName}"]`);
      return $(textarea).is('.is-changed');
    },
    saveEl(compositeName) {
      const element = $(`[data-composite-el="${compositeName}"]`);
      const textarea = $(`[data-composite-textarea="${compositeName}"]`);
      $(element).addClass('is-saved');
      $(textarea).removeClass('is-changed');
    },
    unsaveEl(compositeName) {
      const element = $(`[data-composite-el="${compositeName}"]`);
      $(element).removeClass('is-saved');
    },
    open(activator) {
      const el = activator;
      const compositeName = $(el).attr('data-composite-el');
      const target = $(`[data-composite-target*="${compositeName}"]`);
      $(el).addClass('is-active');
      $(target).addClass('is-active is-opened');
    },
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
        $(el).removeClass('is-active is-opened');
      });
    },
    popupPrepare(popup, compositeName, callback) {
      const elements = $(popup).find('[data-popup-element]');
      const visibleElements = $(popup).find(`[data-popup-element*="${compositeName}"]`);
      const btnContinue = $(popup).find('[data-composite-disable]');
      const btnSave = $(popup).find('[data-composite-save-button]');
      if ($(btnContinue).length > 0) {
        $(btnContinue).attr('data-composite-disable', compositeName);
      }
      if ($(btnSave).length > 0) {
        $(btnSave).attr('data-composite-save-button', compositeName);
      }
      $(elements).addClass('hide');
      $(visibleElements).removeClass('hide');
      setTimeout(() => {
        callback(popup);
      }, 50);
    },
    showSaveButton() {
      const buttonArea = $('[data-composite-save-area]');
      const formPanel = $('[data-composite-panel]');
      $(buttonArea).removeClass('hide');
      $(formPanel).addClass('hide');
    },
    hideSaveButton() {
      const buttonArea = $('[data-composite-save-area]');
      const formPanel = $('[data-composite-panel]');
      $(buttonArea).addClass('hide');
      $(formPanel).removeClass('hide');
    },
  };

  // активируем переключатели вкладок
  $(document).on('change', '[data-composite-activator]', (evt) => {
    const self = evt.currentTarget;
    const compositeName = $(self).attr('data-composite-activator');
    const selfButton = $(`[data-composite-el="${compositeName}"]`);
    if ($(self).prop('checked')) {
      compositeTabs.activeEl(self);
    } else if ($(selfButton).is('.is-active')) {
      compositeTabs.disableEl(self);
      const lastOn = compositeTabs.lastOn();
      compositeTabs.close(selfButton);
      if (window.Modernizr.mq(`(min-width: ${window.globalOptions.sizes.sm}px)`) && lastOn) {
        const newCompositeName = $(lastOn).attr('data-composite-activator');
        const button = $(`[data-composite-el="${newCompositeName}"]`);
        compositeTabs.open(button);
      }
    } else {
      compositeTabs.disableEl(self);
    }
  });

  // работа с изменением textarea
  $(document).on('input', '[data-composite-textarea]', (evt) => {
    const self = evt.currentTarget;
    const compositeName = $(self).attr('data-composite-textarea');
    const button = $('[data-composite-save-button]');
    const value = $(self).val();
    if (value) {
      compositeTabs.unsaveEl(compositeName);
      $(button).attr('data-composite-save-button', compositeName);
      compositeTabs.showSaveButton();
      $(self).addClass('is-changed');
    } else {
      $(self).addClass('is-changed');
      compositeTabs.unsaveEl(compositeName);
      compositeTabs.hideSaveButton();
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
      window[callback](textarea).then((readySave) => {
        if (readySave) {
          compositeTabs.saveEl(compositeName);
          compositeTabs.hideSaveButton();
          if (window.Modernizr.mq(`(max-width: ${window.globalOptions.sizes.sm - 1}px)`)) {
            compositeTabs.close();
          }
        }
      });
    } else {
      compositeTabs.popupPrepare(popup, compositeName, window.globalFunctions.openPopup);
    }
  });

  // напоминание о сохранение на мобиле
  $(document).on('click', '[data-composite-reminder-button]', (evt) => {
    const self = evt.currentTarget;
    const compositeName = $(self).attr('data-composite-reminder-button');
    const popupSaveId = $(self).attr('data-src').split('#').pop();
    const popupSave = $(`#${popupSaveId}`);
    if (compositeTabs.isChanged(compositeName)) {
      compositeTabs.popupPrepare(popupSave, compositeName, window.globalFunctions.openPopup);
    } else {
      compositeTabs.close();
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
      const popupId = $(self).attr('data-src').split('#').pop();
      const compositeName = $(empty[0]).attr('data-composite-el');
      compositeTabs.popupPrepare($(`#${popupId}`), compositeName, window.globalFunctions.openPopup);
    } else {
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
    $(activator).prop('checked', '');
    compositeTabs.disableEl(activator);
    if ($(element).is('.is-active')) {
      const lastOn = compositeTabs.lastOn();
      compositeTabs.close();
      if (window.Modernizr.mq(`(min-width: ${window.globalOptions.sizes.sm}px)`) && lastOn) {
        const newCompositeName = $(lastOn).attr('data-composite-activator');
        const button = $(`[data-composite-el="${newCompositeName}"]`);
        compositeTabs.open(button);
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
    if (!$(self).is('.is-active')) {
      const last = compositeTabs.lastActive();
      const compositeName = $(last).attr('data-composite-el');
      if ($(last).length > 0) {
        if (!$(self).is('.is-disabled') && compositeTabs.isChanged(compositeName)) {
          if (window.Modernizr.mq(`(min-width: ${window.globalOptions.sizes.sm}px)`)) {
            const popupId = $(self).attr('data-src').split('#').pop();
            const popup = $(`#${popupId}`);
            const btnThrowUp = $(popup).find('[data-composite-newtab]');
            $(btnThrowUp).attr('data-composite-newtab', newCompositeName);
            compositeTabs.popupPrepare(popup, compositeName, window.globalFunctions.openPopup);
          }
          compositeTabs.close(notactive);
          compositeTabs.open(self);
        } else if (!$(self).is('.is-disabled')) {
          compositeTabs.close(notactive);
          compositeTabs.open(self);
        }
      } else {
        compositeTabs.open(self);
      }
    } else if (window.Modernizr.mq(`(max-width: ${window.globalOptions.sizes.sm - 1}px)`)) {
      compositeTabs.close(notactive);
      compositeTabs.open(self);
    }
    $(changingElements).addClass('hide');
    $(showChangingElements).removeClass('hide');
    compositeTabs.hideSaveButton();
  });

  // переключаем не сохраняя
  $(document).on('click', '[data-composite-newtab]', () => {
    $.fancybox.close();
    if (window.Modernizr.mq(`(max-width: ${window.globalOptions.sizes.sm - 1}px)`)) {
      compositeTabs.close();
    }
  });
}
