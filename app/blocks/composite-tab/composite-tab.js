const $ = window.$;

export default function compositeTab() {
  const compositeTabs = {
    activeEl(activator) {
      const element = $(activator).closest('[data-composite-el]');
      const compositeName = $(activator).attr('data-composite-activator');
      const textarea = $(`[data-composite-textarea="${compositeName}"]`);
      $(textarea).removeAttr('disabled', 'disabled');
      $(element).removeClass('is-disabled');
    },
    disableEl(activator) {
      const element = $(activator).closest('[data-composite-el]');
      const compositeName = $(activator).attr('data-composite-activator');
      const textarea = $(`[data-composite-textarea="${compositeName}"]`);
      $(textarea).attr('disabled', 'disabled');
      $(element).addClass('is-disabled');
      $(element).removeClass('is-saved');
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
    saveEl(compositeName) {
      const element = $(`[data-composite-el="${compositeName}"]`);
      $(element).addClass('is-saved');
    },
    unsaveEl(compositeName) {
      const element = $(`[data-composite-el="${compositeName}"]`);
      $(element).addClass('is-saved');
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
  };

  // активируем переключатели вкладок
  $(document).on('change', '[data-composite-activator]', (evt) => {
    const self = evt.currentTarget;
    const selfButton = $(self).closest('[data-composite-el]');
    const last = compositeTabs.lastActive();
    const compositeName = $(last).attr('data-composite-el');
    const newCompositeName = $(self).attr('data-composite-activator');
    const buttonArea = $(`[data-composite-save-area="${compositeName}"]`);
    const formPanel = $('[data-hidden-panel]');
    if ($(self).prop('checked')) {
      if (compositeTabs.isSaved(compositeName)) {
        compositeTabs.activeEl(self);
        compositeTabs.close();
        compositeTabs.open(selfButton);
        $(buttonArea).addClass('hide');
        $(formPanel).removeClass('hide');
      } else if ($(last).length > 0) {
        const popupId = $(selfButton).attr('data-src').split('#').pop();
        const popup = $(`#${popupId}`);
        const btnThrowUp = $(popup).find('[data-composite-newtab]');
        $(btnThrowUp).attr('data-composite-newtab', newCompositeName);
        compositeTabs.popupPrepare(popup, compositeName, window.globalFunctions.openPopup);
        compositeTabs.activeEl(self);
        compositeTabs.close();
        compositeTabs.open(selfButton);
        $(buttonArea).addClass('hide');
        $(formPanel).removeClass('hide');
      } else {
        compositeTabs.activeEl(self);
        compositeTabs.close();
        compositeTabs.open(selfButton);
        $(buttonArea).addClass('hide');
        $(formPanel).removeClass('hide');
      }
    } else if ($(selfButton).is('.is-active')) {
      compositeTabs.disableEl(self);
      compositeTabs.close();
    } else {
      compositeTabs.disableEl(self);
    }
  });

  // работа с изменением textarea
  $(document).on('input', '[data-composite-textarea]', (evt) => {
    const self = evt.currentTarget;
    const compositeName = $(self).attr('data-composite-textarea');
    const tab = $(`[data-composite-el="${compositeName}"]`);
    const buttonArea = $(`[data-composite-save-area="${compositeName}"]`);
    const formPanel = $('[data-hidden-panel]');
    const value = $(self).val();
    if (value) {
      $(tab).removeClass('is-saved');
      $(buttonArea).removeClass('hide');
      $(formPanel).addClass('hide');
    } else {
      $(tab).removeClass('is-saved');
      $(buttonArea).addClass('hide');
      $(formPanel).removeClass('hide');
    }
  });

  /* eslint-disable no-unused-vars */
  function textareaSave(obj) {
    return new Promise((resolve) => {
      console.log(obj);
      resolve(true);
    });
  }

  function fullSave(obj) {
    console.log(obj);
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
    const tab = $(`[data-composite-el="${compositeName}"]`);
    const buttonArea = $(`[data-composite-save-area="${compositeName}"]`);
    const formPanel = $('[data-hidden-panel]');
    const popupId = $(self).attr('data-src').split('#').pop();
    const popup = $(`#${popupId}`);
    $.fancybox.close();
    if ($(textarea).val().length > 0) {
      window[callback](textarea).then((readySave) => {
        if (readySave) {
          $(tab).addClass('is-saved');
          $(buttonArea).addClass('hide');
          $(formPanel).removeClass('hide');
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
    const popupEmptyId = $(self).attr('data-src-empty').split('#').pop();
    const popupEmpty = $(`#${popupEmptyId}`);
    const popupSaveId = $(self).attr('data-src-save').split('#').pop();
    const popupSave = $(`#${popupSaveId}`);
    const textarea = $(`[data-composite-textarea="${compositeName}"]`);
    if ($(textarea).val().length > 0) {
      compositeTabs.popupPrepare(popupSave, compositeName, window.globalFunctions.openPopup);
    } else {
      compositeTabs.popupPrepare(popupEmpty, compositeName, window.globalFunctions.openPopup);
    }
  });

  // coхранение полное
  $(document).on('click', '[data-composite-full-save]', (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    const self = evt.currentTarget;
    const callback = $(self).attr('data-callback');
    const form = $(self).closest('form');
    const tabs = $(form).find('[data-composite-el]');
    const tabsActive = $(tabs).filter((i, el) => {
      const activator = $(el).find('[data-composite-activator]');
      return $(activator).prop('checked');
    });
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
    $(element).removeClass('is-saved');
    if ($(element).is('.is-active')) {
      compositeTabs.close();
    }
    $.fancybox.close();
  });

  // переключаем вкладки
  $(document).on('click', '[data-composite-el]', (evt) => {
    const self = evt.currentTarget;
    const source = evt.target;
    const isChecked = $(source).is('[data-composite-checkbox]') || $(source).closest('[data-composite-checkbox]').length > 0;
    const notactive = $('[data-composite-el]').not(self);
    if (!$(self).is('.is-active')) {
      const last = compositeTabs.lastActive();
      const compositeName = $(last).attr('data-composite-el');
      const newCompositeName = $(self).attr('data-composite-el');
      const buttonArea = $(`[data-composite-save-area="${compositeName}"]`);
      const formPanel = $('[data-hidden-panel]');
      if (compositeTabs.isSaved(compositeName)) {
        if (!$(self).is('.is-disabled') && !isChecked) {
          compositeTabs.close(notactive);
          compositeTabs.open(self);
          $(buttonArea).addClass('hide');
          $(formPanel).removeClass('hide');
        }
      } else if (!$(self).is('.is-disabled') && !isChecked) {
        if (window.Modernizr.mq(`(min-width: ${window.globalOptions.sizes.sm}px)`)) {
          const popupId = $(self).attr('data-src').split('#').pop();
          const popup = $(`#${popupId}`);
          const btnThrowUp = $(popup).find('[data-composite-newtab]');
          $(btnThrowUp).attr('data-composite-newtab', newCompositeName);
          compositeTabs.popupPrepare(popup, compositeName, window.globalFunctions.openPopup);
        }
        compositeTabs.close(notactive);
        compositeTabs.open(self);
        $(buttonArea).addClass('hide');
        $(formPanel).removeClass('hide');
      }
    } else if (window.Modernizr.mq(`(max-width: ${window.globalOptions.sizes.sm - 1}px)`)) {
      compositeTabs.close(notactive);
      compositeTabs.open(self);
    }
  });

  // переключаем не сохраняя
  $(document).on('click', '[data-composite-newtab]', () => {
    $.fancybox.close();
    if (window.Modernizr.mq(`(max-width: ${window.globalOptions.sizes.sm - 1}px)`)) {
      compositeTabs.close();
    }
  });
}
